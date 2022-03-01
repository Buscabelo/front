import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import logo from '../../../../assets/images/Buscabelo_logo.png';
import SearchInput from '../SearchInput/SearchInput';
import AuthInfo from './AuthInfo';
import Submenu from './Submenu';

import './Header.css';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const [showSearch, setShowSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setShowSearch(true);
    }
  }, []);

  return (
    <header className="topbar">
      <a href="/estabelecimentos">
        <img src={logo} width="80" alt="Logo Buscabelo" />
      </a>
      <nav className="navbar">
        <a href='/estabelecimentos' className='active'>Estabelecimentos</a>
        <a href='/servicos'>Serviços</a>
        {!user && <a href='#'>Sobre o Buscabelo</a>}
        {user && <SearchInput
          isShow={showSearch}
          hide={() => setShowSearch(false)}
        />}
      </nav>
      <div className="downbar">
        {!user && <a className='btn-link' href='/cadastro'>Criar conta</a>}
        <AuthInfo
          user={user}
          showMenu={() => setOpenMenu(!openMenu)}
        />
      </div>
      <Submenu
        user={user}
        isShow={openMenu}
        hide={() => setOpenMenu(false)}
      />
    </header>
  );
}
