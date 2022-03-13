import { useLocation } from 'react-router-dom';
import { IoHome, IoGrid, IoCalendar, IoSettingsSharp, IoExitOutline } from 'react-icons/io5';

import logo from '../../../../assets/images/Buscabelo_logo.png';

import './MenuBar.css';

export default function MenuBar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('@buscabelo_client/user');
    localStorage.removeItem('@buscabelo_client/token');
  };

  return (
    <div className="Container">
      <div className="Topside">
        <a href="/painel">
          <img src={logo} width="150" alt="logo" />
        </a>

        <div className="MenuButton">
          <a href="/painel" className={location.pathname === '/painel' ? 'btn active' : 'btn'}>
            <IoHome />
            <span>Pagina Inicial</span>
          </a>
        </div>

        <div className="MenuButton">
          <a href="/painel/servicos" className={location.pathname === '/painel/servicos' ? 'btn active' : 'btn'}>
            <IoGrid />
            <span>Serviços</span>
          </a>
        </div>

        <div className="MenuButton">
          <a href="/painel/agendamentos" className={location.pathname === '/painel/agendamentos' ? 'btn active' : 'btn'}>
            <IoCalendar />
            <span>Agendamentos</span>
          </a>
        </div>

        <div className="MenuButton">
          <a href="/painel/perfil/edicao" className={location.pathname === '/painel/perfil/edicao' ? 'btn active' : 'btn'}>
            <IoSettingsSharp />
            <span>Editar dados</span>
          </a>
        </div>

        <div className="MenuButton">
          <a href="/" onClick={handleLogout} className="btn">
            <IoExitOutline />
            <span>Sair</span>
          </a>
        </div>
      </div>
    </div>
  );
}
