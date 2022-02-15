import { MdExplore, MdHome, MdLogin, MdPerson } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './style.css';

export default function FloatMenu() {
  const { location } = useHistory();
  const authPaths = [
    '/acesso',
    '/cadastro'
  ];
  const profilePaths = [
    '/perfil',
    '/agendamentos'
  ];
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));

  return (
    <nav className="menu-container">
      <a className={'menu-item' + (location.pathname === '/' ? ' active' : '')} href="/">
        <MdHome /> Home
      </a>
      <a className={'menu-item' + (location.pathname === '/pesquisa' ? ' active' : '')} href="/pesquisa">
        <MdExplore />
        Explorar
      </a>
      {user ?
        <a className={'menu-item' + (profilePaths.includes(location.pathname) ? ' active' : '')} href="/perfil">
          <MdPerson />
          Perfil
        </a>
        :
        <a className={'menu-item' + (authPaths.includes(location.pathname) ? ' active' : '')} href="/acesso">
          <MdLogin /> Entrar
        </a>
      }
    </nav>
  );
}
