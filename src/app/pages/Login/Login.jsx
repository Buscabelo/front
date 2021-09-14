import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Login.css';
import logo from '../../assets/images/logo.png';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = ({ preventDefault }) => {
    preventDefault();
    const body = JSON.stringify({ email, password });

    fetch(`${process.env.REACT_APP_API}/sessions`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(response => response.json())
      .then(({ success, token, user }) => {
        if (success) {
          localStorage.setItem('@buscabelo_client/user', JSON.stringify(user));
          localStorage.setItem('@buscabelo_client/token', token);
          history.push('/');
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  return (
    <article className="login-wrapper">
      <aside className="cta">
        <img src={logo} alt="Logo Buscabelo" />
        Os melhores salões da região estão aqui
      </aside>
      <main>
        <form onSubmit={handleSubmit}>
          <h1 id="login-title">Login</h1>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({target}) => setEmail(target.value)} required />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input type="password" placeholder="Ex: ******" value={password} onChange={({target}) => setPassword(target.value)} required />
          </div>
          <button className="btn-block" type="submit">Entrar</button>
          <section className="register-cta">
            Não tem uma conta? <a href="/cadastrar">Cadastre-se aqui!</a>
          </section>
        </form>
      </main>
    </article>
  );
}
