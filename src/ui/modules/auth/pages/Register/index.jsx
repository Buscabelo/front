import { useContext, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';
import { AppContext } from '../../../common/context/AppContext';
import logo from '../../../../assets/images/Buscabelo_logo.png';

export default function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProvider, setIsProvider] = useState(false);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const { reloadAuth } = useContext(AppContext);

  const handleSubmit = async event => {
    event.preventDefault();
    const route = isProvider ? 'providers' : 'customers' ;
    const body = {
      name: isProvider ? name : `${name} ${lastname}`,
      email,
      password,
    };

    if (isProvider) {
      body.address = address;
      body.description = description;
    } else {
      body.avatar = null;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/${route}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const { success, message } = await response.json();

      if (success) {
        history.push('/acesso');
      } else {
        throw new Error(message);
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  const handleGoogleLoginSuccess = async response => {
    if (response.profileObj) {
      const { name, email } = response.profileObj;

      try {
        const response = await fetch(`${process.env.REACT_APP_API}/customers/googleAuth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email })
        });
        const { success, user, token } = await response.json();

        if (success) {
          localStorage.setItem('@buscabelo/user', JSON.stringify(user));
          localStorage.setItem('@buscabelo/token', token);
          reloadAuth();
          history.push('/');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const handleGoogleLoginFailure = response => {
    // eslint-disable-next-line no-console
    console.error(response);
  };

  if (isMobile || isTablet) {
    return (
      <Layout>
        <article className="register-wrapper">
          <img src={logo} alt="Logo Buscabelo" />
          <form onSubmit={handleSubmit}>
            <h1 className='title-form'>Inscreva-se no Buscabelo agora mesmo</h1>
            {isProvider ?
              <fieldset>
                <label>Nome</label>
                <input type="text" placeholder="Ex: Yan" value={name} onChange={({ target }) => setName(target.value)} required />
              </fieldset>
              : <>
                <fieldset>
                  <label>Nome</label>
                  <input type="text" placeholder="Ex: Yan" value={name} onChange={({ target }) => setName(target.value)} required />
                </fieldset>
                <fieldset>
                  <label>Sobrenome</label>
                  <input type="text" placeholder="Ex: Victor" value={lastname} onChange={({ target }) => setLastname(target.value)} required />
                </fieldset>
              </>
            }
            <fieldset>
              <label>Email</label>
              <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({ target }) => setEmail(target.value)} required />
            </fieldset>
            <fieldset>
              <label>Senha</label>
              <input type="password" placeholder="Ex: ******" value={password} onChange={({ target }) => setPassword(target.value)} required />
            </fieldset>
            {isProvider && <>
              <fieldset>
                <label>Descrição</label>
                <textarea rows="3" onChange={({target}) => setDescription(target.value)} required />
              </fieldset>
              <fieldset>
                <label>Endereço</label>
                <input type="text" placeholder="Rua do Marechal, 126" value={address} onChange={({ target }) => setAddress(target.value)} required />
              </fieldset>
            </>}
            <fieldset>
              <label>
                <input type="checkbox" checked={isProvider} onChange={({ target }) => setIsProvider(target.checked)} />
                Possui um estabelecimento?
              </label>
            </fieldset>
            {!isProvider && <GoogleLogin
              clientId="698519431370-hqbblgqr7v6vl3vd96itd98j0d4a3ibv.apps.googleusercontent.com"
              buttonText="Cadastrar usando Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
            />}
            <button type="submit">Cadastrar</button>
            <p>Possui uma conta? <a href="/acesso">Conecte-se</a></p>
          </form>
        </article>
      </Layout>
    );
  }

  return (
    <article className="register-wrapper">
      <aside className="cta">
        <img src={logo} alt="Logo Buscabelo" />
        <h3>Encontre os melhores salões da região aqui.</h3>
      </aside>
      <main>
        <form onSubmit={handleSubmit}>
          <h1 className='title-form'>Inscreva-se no Buscabelo agora mesmo.</h1>
          {isProvider ?
            <div className="input-group">
              <label>Nome: *</label>
              <input placeholder="Ex: Yan" value={name} onChange={({target}) => setName(target.value)} required />
            </div>
            : <>
              <div className="input-group">
                <label>Nome: *</label>
                <input placeholder="Ex: Yan" value={name} onChange={({target}) => setName(target.value)} required />
              </div>
              <div className="input-group">
                <label>Sobrenome: *</label>
                <input placeholder="Ex: Victor" value={lastname} onChange={({target}) => setLastname(target.value)} required />
              </div>
            </>
          }
          <div className="input-group">
            <label>Email: *</label>
            <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({target}) => setEmail(target.value)} required />
          </div>
          <div className="input-group">
            <label>Senha: *</label>
            <input type="password" placeholder="Ex: ******" value={password} onChange={({target}) => setPassword(target.value)} required />
          </div>
          {isProvider && <>
            <div className="input-group">
              <label>Descrição: *</label>
              <textarea onChange={({target}) => setDescription(target.value)} required />
            </div>
            <div className="input-group">
              <label>Endereço: *</label>
              <input placeholder="Rua do Marechal, 126" value={address} onChange={({target}) => setAddress(target.value)} required />
            </div>
          </>}
          <div className="input-group">
            <label>
              <input type="checkbox" checked={isProvider} onChange={({ target }) => setIsProvider(target.checked)} />
              Possui um estabelecimento?
            </label>
          </div>
          <button className='btn' type="submit">Cadastrar</button>
        </form>
        {!isProvider && <GoogleLogin
          clientId="698519431370-hqbblgqr7v6vl3vd96itd98j0d4a3ibv.apps.googleusercontent.com"
          buttonText="Cadastrar usando Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
          className="button-google"
        />}
        <section className="login-cta">
          Tem uma conta?
          <a className='btn-link' href="/acesso">Conecte-se</a>
        </section>
      </main>
    </article>
  );
}
