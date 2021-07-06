import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Register.css';
import logo from '../../assets/images/logo.png';
import Divider from "../../components/Divider/Divider";

export default function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = JSON.stringify({ name: `${name} ${lastname}`, email, password, avatar: null })

    fetch(`${process.env.REACT_APP_API}/customers`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then((response) => {
        history.push('/login');
      })
      .catch((error) => {
        console.error(error)
      })
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
            <input placeholder="Ex: Yan" value={name} onChange={({target}) => setName(target.value)} required />
          </div>
          <div className="input-group">
            <label>Sobrenome:</label>
            <input placeholder="Ex: Victor" value={lastname} onChange={({target}) => setLastname(target.value)} required />
          </div>
          <div className="input-group">
            <label>Nome de usuário:</label>
            <input placeholder="Ex: yan_victor" value={nick} onChange={({target}) => setNick(target.value)} />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" placeholder="Ex: yanvictor@example.com" value={email} onChange={({target}) => setEmail(target.value)} required />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input type="password" placeholder="Ex: ******" value={password} onChange={({target}) => setPassword(target.value)} required />
          </div>
          <button type="submit">Cadastrar</button>
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
