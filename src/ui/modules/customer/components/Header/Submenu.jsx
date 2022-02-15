import { IoIosSettings, IoMdLogOut, IoIosCalendar } from 'react-icons/io';

export default function Submenu({ user, isShow, hide }) {
  const handleLogout = event => {
    event.preventDefault();
    localStorage.removeItem('@buscabelo_client/user');
    localStorage.removeItem('@buscabelo_client/token');
    hide();
  };

  if (user && isShow) {
    return (
      <div className="submenu">
        <span>Olá, {user.name}</span>
        <ol className="submenu-list">
          <li><a href="#"><IoIosSettings />&nbsp;&nbsp;Editar dados</a></li>
          <li><a href="/agendamentos"><IoIosCalendar />&nbsp;&nbsp;Agendamentos</a></li>
          <li><a href="/" onClick={handleLogout}><IoMdLogOut />&nbsp;&nbsp;Sair</a></li>
        </ol>
      </div>
    );
  }

  return null;
}
