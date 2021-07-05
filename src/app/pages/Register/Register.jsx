import { useHistory } from 'react-router-dom';

import './Register.css';
import logo from '../../assets/images/logo.png';
import Divider from "../../components/Divider/Divider";

export default function Register() {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push('/login');
  }

  return (
    <article className="register-wrapper">
      <aside className="cta">
        <img src={logo} alt="Logo Buscabelo" />
        Encontre os melhores salões da região aqui
      </aside>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome:</label>
            <input placeholder="Ex: Yan" />
          </div>
          <div className="input-group">
            <label>Sobrenome:</label>
            <input placeholder="Ex: Victor" />
          </div>
          <div className="input-group">
            <label>Nome de usuário:</label>
            <input placeholder="Ex: yan_victor" />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Ex: yanvictor@example.com" />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input type="password" placeholder="Ex: ******" />
          </div>
          <button type="submit">Registro</button>
        </form>
        <Divider size={1} />
        <section className="login-cta">
          Tem uma conta?
          <a href="/login">Conecte-se</a>
        </section>
      </main>
    </article>
  )
}
