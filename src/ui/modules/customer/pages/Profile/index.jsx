import { isMobile, isTablet } from 'react-device-detect';
import { MdEdit, MdList, MdLogout } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './styles.css';

export default function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));

  if (isMobile || isTablet) {
    return (
      <article className="profile-wrapper">
        <header>
          <img src={user.avatar || 'https://picsum.photos/300/300'} />
        </header>
        <main>
          <nav>
            <a href="#">
              <MdEdit />
              Editar Perfil
            </a>
            <a href="/agendamentos">
              <MdList />
              Meus Agendamentos
            </a>
            <a href="/agendamentos">
              <MdLogout />
              Sair
            </a>
          </nav>
        </main>
      </article>
    );
  }

  history.replace('/');
}
