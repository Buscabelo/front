import { isMobile } from 'react-device-detect';
import { IoMdLogIn } from 'react-icons/io';

export default function AuthInfo({ user, showMenu }) {
  if (isMobile)
    return null;

  const handleShowMenu = ({ preventDefault }) => {
    preventDefault();
    showMenu();
  };

  if (user)
    return (
      <a href="/" onClick={handleShowMenu}>
        {user.name}
      </a>
    );

  return (
    <a href="/login">
      <IoMdLogIn /> Entrar
    </a>
  );
}
