import { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import './styles.css';
import logo from '../../../../assets/images/logo.png';
import mobilelogo from '../../../../assets/images/logo@1x.png';

export default function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    const body = JSON.stringify({ name: `${name} ${lastname}`, email, password, avatar: null });

    try {
      await fetch(`${process.env.REACT_APP_API}/customers`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
      history.push('/acesso');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
          localStorage.setItem('@buscabelo_client/user', JSON.stringify(user));
          localStorage.setItem('@buscabelo_client/token', token);
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
      <article className="register-wrapper">
        <img src={logo} alt="Logo Buscabelo" />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>Nome</label>
            <input type="text" placeholder="Ex: Yan" name="nome" value={name} onChange={({ target }) => setName(target.value)} required />
          </fieldset>

          <fieldset>
            <label>Sobrenome</label>
            <input type="text" placeholder="Ex: Victor" name="sobrenome" value={lastname} onChange={({ target }) => setLastname(target.value)} required />
          </fieldset>

          <fieldset>
            <label>Email</label>
            <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({ target }) => setEmail(target.value)} required />
          </fieldset>

          <fieldset>
            <label>Senha</label>
            <input type="password" placeholder="Ex: ******" value={password} onChange={({ target }) => setPassword(target.value)} required />
          </fieldset>

          <GoogleLogin
            clientId="698519431370-hqbblgqr7v6vl3vd96itd98j0d4a3ibv.apps.googleusercontent.com"
            buttonText="Cadastrar usando Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />

          <button type="submit">Cadastrar</button>

          <p>Possui uma conta? <a href="/acess">Conecte-se</a></p>
        </form>
      </article>
    );
  }

  return (
    <></>
    // <article className="register-wrapper">
    //   <aside className="cta">
    //     <img src={logo} alt="Logo Buscabelo" />
    //     Encontre os melhores salões da região aqui
    //   </aside>
    //   <main>
    //     <form onSubmit={handleSubmit}>
    //       <div className="input-group">
    //         <label>Nome:</label>
    //         <input placeholder="Ex: Yan" value={name} onChange={({target}) => setName(target.value)} required />
    //       </div>
    //       <div className="input-group">
    //         <label>Sobrenome:</label>
    //         <input placeholder="Ex: Victor" value={lastname} onChange={({target}) => setLastname(target.value)} required />
    //       </div>
    //       <div className="input-group">
    //         <label>Nome de usuário:</label>
    //         <input placeholder="Ex: yan_victor" value={nick} onChange={({target}) => setNick(target.value)} />
    //       </div>
    //       <div className="input-group">
    //         <label>Email:</label>
    //         <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({target}) => setEmail(target.value)} required />
    //       </div>
    //       <div className="input-group">
    //         <label>Senha:</label>
    //         <input type="password" placeholder="Ex: ******" value={password} onChange={({target}) => setPassword(target.value)} required />
    //       </div>
    //       <button type="submit">Cadastrar</button>
    //     </form>
    //     <Divider size={1} />
    //     <GoogleLogin
    //       clientId="698519431370-hqbblgqr7v6vl3vd96itd98j0d4a3ibv.apps.googleusercontent.com"
    //       buttonText="Cadastrar usando Google"
    //       onSuccess={handleGoogleLoginSuccess}
    //       onFailure={handleGoogleLoginFailure}
    //       cookiePolicy={'single_host_origin'}
    //       style={{margin: '0 auto'}}
    //     />
    //     <Divider size={1} />
    //     <section className="login-cta">
    //       Tem uma conta?
    //       <a href="/acesso">Conecte-se</a>
    //     </section>
    //   </main>
    // </article>
  );
}
