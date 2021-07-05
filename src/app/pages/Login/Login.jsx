import { useHistory } from 'react-router-dom';

import './Login.css';
import logo from '../../assets/images/logo.png';

export default function Login() {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify({}))
    history.push('/');
  }

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
            <input placeholder="Ex: Yan" />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input type="password" placeholder="Ex: ******" />
          </div>
          <button className="btn-block" type="submit">Entrar</button>
          <section className="register-cta">
            Não tem uma conta? <a href="/cadastrar">Cadastre-se aqui!</a>
          </section>
        </form>
      </main>
    </article>
  )
}
