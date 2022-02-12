import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
// import { MdMenu, MdSearch } from 'react-icons/md';

import './Header.css';
// eslint-disable-next-line
import logo from '../../../../assets/images/logo.png';
import AuthInfo from './AuthInfo';
import SearchInput from './SearchInput';
import Submenu from './Submenu';

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
      <a href="/">
        <img src={logo} width="80" alt="Logo Buscabelo" />
      </a>
      <SearchInput
        isShow={showSearch}
        hide={() => setShowSearch(false)}
      />
      <nav className="navbar">
        <a href='#'>Serviços</a>
        <a href='#'>Estabelecimentos</a>
        <a href='#'>Sobre o Buscabelo</a>
        {/* <button type="button" onClick={() => setShowSearch(true)}>
          <MdSearch />
        </button>
        <button type="button" onClick={() => setOpenMenu(!openMenu)}>
          <MdMenu />
        </button> */}
      </nav>
      <div className="downbar">
        <a className='createConta' href='/cadastro'>Criar conta</a>
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
