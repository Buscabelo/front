import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { MdMenu, MdSearch } from 'react-icons/md';

import './Header.css';
import AuthInfo from './AuthInfo';
import SearchInput from './SearchInput';
import Submenu from './Submenu';
import logo from '../../assets/images/logo.png';

export default function Header({ user = null }) {
  const [showSearch, setShowSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setShowSearch(true);
    }
  })

  return (
    <header>
      <a href="/">
        <img src={logo} width="80" />
      </a>
      <SearchInput
        isShow={showSearch}
        hide={() => setShowSearch(false)}
      />
      <nav>
        <button onClick={() => setShowSearch(true)}>
          <MdSearch />
        </button>
        <button onClick={() => setOpenMenu(!openMenu)}>
          <MdMenu />
        </button>
        <AuthInfo
          user={user}
          showMenu={() => setOpenMenu(!openMenu)}
        />
      </nav>
      <Submenu
        isShow={openMenu}
        hide={() => setOpenMenu(false)}
      />
    </header>
  )
}
