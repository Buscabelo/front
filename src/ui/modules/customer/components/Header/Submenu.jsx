import { useContext } from 'react';
import { IoIosSettings, IoMdLogOut, IoIosCalendar } from 'react-icons/io';
import clsx from 'clsx';

import { AppContext } from '../../../common/context/AppContext';

export default function Submenu({ user, isShow, hide }) {
  const { reloadAuth } = useContext(AppContext);

  const handleLogout = event => {
    event.preventDefault();
    localStorage.removeItem('@buscabelo_client/user');
    localStorage.removeItem('@buscabelo_client/token');
    reloadAuth();
    hide();
  };

  if (user && isShow) {
    return (
      <div className="submenu">
        <span>Olá, {user.name}</span>
        <ol>
          <li>
            <a href="/agendamentos" className={clsx({ active: location.pathname === '/agendamentos' })}>
              <IoIosCalendar />
              Agendamentos
            </a>
          </li>
          <li>
            <a href="/perfil/editar" className={clsx({ active: location.pathname === '/perfil/editar' })}>
              <IoIosSettings />
              Editar dados
            </a>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              <IoMdLogOut />
              Sair
            </a>
          </li>
        </ol>
      </div>
    );
  }

  return null;
}
