import { isMobile, isTablet } from 'react-device-detect';
import { MdEdit, MdCalendarToday, MdLogout } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';

export default function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));

  const logout = () => {
    localStorage.removeItem('@buscabelo_client/user');
    localStorage.removeItem('@buscabelo_client/token');
    history.replace('/');
  };

  if (isMobile || isTablet) {
    return (
      <Layout>
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
                <MdCalendarToday />
                Meus Agendamentos
              </a>
              <a onClick={() => logout()}>
                <MdLogout />
                Sair
              </a>
            </nav>
          </main>
        </article>
      </Layout>
    );
  }

  history.replace('/');
}
