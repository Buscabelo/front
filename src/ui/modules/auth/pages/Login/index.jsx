import { useContext, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import './styles.css';
import { userTypes } from '../../../../constants/user';
import Layout from '../../../common/components/CustomerLayout';
import { AppContext } from '../../../common/context/AppContext';
import logo from '../../../../assets/images/Buscabelo_logo.png';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { reloadAuth } = useContext(AppContext);

  const handleSubmit = async event => {
    event.preventDefault();
    const body = JSON.stringify({ email, password });

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
      const { success, user, token, message } = await response.json();

      if (success) {
        if (user.type === userTypes.Provider) {
          localStorage.setItem('@buscabelo-estabelecimento/me', JSON.stringify(user));
          localStorage.setItem('@buscabelo-estabelecimento/token', token);
          reloadAuth();
          history.push('/painel');
        } else {
          localStorage.setItem('@buscabelo_client/user', JSON.stringify(user));
          localStorage.setItem('@buscabelo_client/token', token);
          reloadAuth();

          if (isMobile || isTablet){
            history.push('/');
          } else {
            history.push('/estabelecimentos');
          }
        }
      } else {
        throw Error(message);
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };

  const handleGoogleLoginSuccess = async g_response => {
    if (g_response.profileObj) {
      const { name, email } = g_response.profileObj;

      try {
        const response = await fetch(`${process.env.REACT_APP_API}/customers/googleAuth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email })
        });
        const { success, user, token, message } = await response.json();

        if (success) {
          if (user.type === userTypes.Provider) {
            localStorage.setItem('@buscabelo-estabelecimento/me', JSON.stringify(user));
            localStorage.setItem('@buscabelo-estabelecimento/token', token);
            reloadAuth();
            history.push('/painel');
          } else {
            localStorage.setItem('@buscabelo_client/user', JSON.stringify(user));
            localStorage.setItem('@buscabelo_client/token', token);
            reloadAuth();
            history.push('/');
          }
        } else {
          throw Error(message);
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      }
    }
  };

  const handleGoogleLoginFailure = g_response => {
    // eslint-disable-next-line no-console
    console.error(g_response);
  };

  if (isMobile || isTablet) {
    return (
      <Layout>
        <article className="login-wrapper">
          <main className="card">
            <img src={logo} alt="Logo Buscabelo" />

            <form onSubmit={handleSubmit}>
              <fieldset>
                <label>Email</label>
                <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({ target }) => setEmail(target.value)} required />
              </fieldset>

              <fieldset>
                <label>Senha</label>
                <input type="password" placeholder="Ex: ******" value={password} onChange={({ target }) => setPassword(target.value)} required />
                <a href="#">Esqueceu sua senha?</a>
              </fieldset>

              <GoogleLogin
                clientId="698519431370-hqbblgqr7v6vl3vd96itd98j0d4a3ibv.apps.googleusercontent.com"
                buttonText="Entrar usando Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
              />

              <button type="submit">Entrar</button>
            </form>

            <p>
              Não tem uma conta? <a href="/cadastro">Cadastre-se aqui</a>
            </p>
          </main>
        </article>
      </Layout>
    );
  }

  return (
    <article className="login-wrapper">
      <aside className="cta">
        <img src={logo} alt="Logo Buscabelo" />
        <h3>Os melhores salões da região estão aqui.</h3>
      </aside>
      <main>
        <form onSubmit={handleSubmit}>
          <h1 id="login-title">Entrar no Buscabelo</h1>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({target}) => setEmail(target.value)} required />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="Ex: ******" value={password} onChange={({target}) => setPassword(target.value)} required />
          </div>
          <button className="btn-block" type="submit">Entrar</button>
          <GoogleLogin
            clientId="698519431370-hqbblgqr7v6vl3vd96itd98j0d4a3ibv.apps.googleusercontent.com"
            buttonText="Entrar usando Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
            className="button-google"
          />
          <section className="register-cta">
            Não tem uma conta? <a href="/cadastro">Cadastre-se aqui!</a>
          </section>
        </form>
      </main>
    </article>
  );
}
