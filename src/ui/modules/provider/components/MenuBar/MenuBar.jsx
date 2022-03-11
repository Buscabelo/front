import { useLocation } from 'react-router-dom';
import { IoHome, IoGrid, IoCalendar, IoExitOutline } from 'react-icons/io5';

import logo from '../../../../assets/images/Buscabelo_logo.png';

import './MenuBar.css';

export default function MenuBar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('@buscabelo/user');
    localStorage.removeItem('@buscabelo/token');
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
          <a href="/" onClick={handleLogout} className="btn">
            <IoExitOutline />
            <span>Sair</span>
          </a>
        </div>
      </div>
    </div>
  );
}
