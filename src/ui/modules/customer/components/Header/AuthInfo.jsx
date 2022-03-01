import { isMobile } from 'react-device-detect';
import { IoMdLogIn } from 'react-icons/io';

import { IoPersonOutline } from 'react-icons/io5';

export default function AuthInfo({ user, showMenu }) {
  if (isMobile)
    return null;

  const handleShowMenu = event => {
    event.preventDefault();
    showMenu();
  };

  if (user)
    return (
      <a className='btn-link btnUser' href="/" onClick={handleShowMenu}>
        <IoPersonOutline />
      </a>
    );

  return (
    <a className='btn createConta' href="/acesso">
      <IoMdLogIn />&nbsp;&nbsp;Entrar
    </a>
  );
}
