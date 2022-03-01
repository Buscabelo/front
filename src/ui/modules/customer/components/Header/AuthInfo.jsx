import { isMobile } from 'react-device-detect';
import { IoMdLogIn} from 'react-icons/io';

import { FaUserAlt } from 'react-icons/fa';

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
        <FaUserAlt />
      </a>
    );

  return (
    <a className='btn createConta' href="/acesso">
      <IoMdLogIn />&nbsp;&nbsp;Entrar
    </a>
  );
}
