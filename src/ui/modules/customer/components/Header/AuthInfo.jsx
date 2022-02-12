import { isMobile } from 'react-device-detect';
import { IoMdLogIn } from 'react-icons/io';

import './AuthInfo.css';

export default function AuthInfo({ user, showMenu }) {
  if (isMobile)
    return null;

  const handleShowMenu = event => {
    event.preventDefault();
    showMenu();
  };

  if (user)
    return (
      <a className='btnUser' href="/" onClick={handleShowMenu}>
        {user.name}
      </a>
    );

  return (
    <a className='btnLogin' href="/acesso">
      <IoMdLogIn />&nbsp;&nbsp;Entrar
    </a>
  );
}
