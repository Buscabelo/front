import { MdExplore, MdHome, MdLogin, MdPerson } from 'react-icons/md';
import { useRouteMatch } from 'react-router-dom';

import './style.css';

export default function FloatMenu() {
  const { path } = useRouteMatch();
  const authPaths = [
    '/acesso',
    '/cadastro'
  ];
  const profilePaths = [
    '/perfil',
    '/agendamentos',
    '/agendamento/:id'
  ];
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));

  return (
    <nav className="menu-container">
      <a className={'menu-item' + (path === '/' ? ' active' : '')} href="/">
        <MdHome /> Home
      </a>
      <a className={'menu-item' + (path === '/pesquisa' ? ' active' : '')} href="/pesquisa">
        <MdExplore />
        Explorar
      </a>
      {user ?
        <a className={'menu-item' + (profilePaths.includes(path) ? ' active' : '')} href="/perfil">
          <MdPerson />
          Perfil
        </a>
        :
        <a className={'menu-item' + (authPaths.includes(path) ? ' active' : '')} href="/acesso">
          <MdLogin /> Entrar
        </a>
      }
    </nav>
  );
}
