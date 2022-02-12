export default function Submenu({ user, isShow, hide }) {
  const handleLogout = event => {
    event.preventDefault();
    localStorage.removeItem('@buscabelo_client/user');
    localStorage.removeItem('@buscabelo_client/token');
    hide();
  };

  if (user && isShow) {
    return (
      <ul className="submenu">
        <a href="/agendamentos">Agendamentos</a>
        <a href="/" onClick={handleLogout}>Sair</a>
      </ul>
    );
  }

  return null;
}
