import { MdExplore, MdHome, MdLogin } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './style.css';

export default function FloatMenu({ user }) {
  const { location } = useHistory();
  const authPaths = [
    '/acesso',
    '/cadastro'
  ];

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
        <a className={'menu-item' + (location.pathname === '/perfil' ? ' active' : '')} href="/perfil">
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
