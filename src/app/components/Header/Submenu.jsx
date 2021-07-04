export default function Submenu({ user, isShow, hide }) {
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    hide();
  }

  if (user && isShow) {
    return (
      <nav className="submenu">
        <a href="/agendamentos">Agendamentos</a>
        <a href="/" onClick={handleLogout}>Sair</a>
      </nav>
    );
  }

  return null;
}
