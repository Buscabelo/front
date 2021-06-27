export default function Submenu({ isShow, hide }) {
  const handleLogout = (e) => {
    e.preventDefault();
    hide()
  }

  if (isShow)
    return (
      <nav className="submenu">
        <a href="/agendamentos">Agendamentos</a>
        <a href="" onClick={handleLogout}>Sair</a>
      </nav>
    );

  return null;
}
