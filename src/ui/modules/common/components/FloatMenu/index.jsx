import { MdExplore, MdHome, MdLogin, MdPerson } from 'react-icons/md';
import { useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';

import './style.css';

export default function FloatMenu() {
  const { path } = useRouteMatch();
  const authPaths = [
    '/acesso',
    '/cadastro'
  ];
  const profilePaths = [
    '/perfil',
    '/perfil/editar',
    '/agendamentos',
    '/agendamento/:id'
  ];
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));

  return (
    <nav className="menu-container">
      <a className={clsx('menu-item', { 'active': path === '/' })} href="/">
        <MdHome /> Home
      </a>
      <a className={clsx('menu-item', { 'active': path === '/pesquisa' })} href="/pesquisa">
        <MdExplore />
        Explorar
      </a>
      {user ?
        <a className={clsx('menu-item', { 'active': profilePaths.includes(path) })} href="/perfil">
          <MdPerson />
          Perfil
        </a>
        :
        <a className={clsx('menu-item', { 'active': authPaths.includes(path) })} href="/acesso">
          <MdLogin /> Entrar
        </a>
      }
    </nav>
  );
}
