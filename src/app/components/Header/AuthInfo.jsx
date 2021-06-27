import { isMobile } from 'react-device-detect';
import { IoMdLogIn } from 'react-icons/io';

export default function AuthInfo({ user, showMenu }) {
  if (isMobile)
    return null;

  const handleShowMenu = (e) => {
    e.preventDefault();
    showMenu();
  }

  if (user)
    return (
      <a onClick={handleShowMenu}>
        Logado
      </a>
    );

  return (
    <a href="/login">
      <IoMdLogIn /> Entrar
    </a>
  );
}
