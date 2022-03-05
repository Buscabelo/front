import { useRef } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { MdCameraAlt, MdChevronLeft, MdModeEdit } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { minStackLength } from '../../../../constants';
import Layout from '../../../common/components/CustomerLayout';

export default function ProfileEdit() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const token = localStorage.getItem('@buscabelo_client/token');
  const avatarRef = useRef();
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleUpload = () => {
    avatarRef.current.click();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const avatarChanged = !!avatarRef.current.files.length;

    if (avatarChanged) {
      try {
        const firstIndex = 0;
        const formData = new FormData();
        formData.append('avatar', avatarRef.current.files[firstIndex]);

        const response = await fetch(`${process.env.REACT_APP_API}/customers/avatar`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        const { success, user: userChanged } = await response.json();

        if (success) {
          localStorage.setItem('@buscabelo_client/user', JSON.stringify(userChanged));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    const body = {
      name: name.current.value !== name.current.defaultValue ? name.current.value : null,
      email: email.current.value !== email.current.defaultValue ? email.current.value : null,
      password: password.current.value !== password.current.defaultValue ? password.current.value : null
    };
    const dataChanged = !!Object.values(body).filter(f => f !== null).length;

    if (dataChanged) {
      try {
        const editResponse = await fetch(`${process.env.REACT_APP_API}/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });
        const { success, user: userChanged } = await editResponse.json();

        if (success) {
          localStorage.setItem('@buscabelo_client/user', JSON.stringify(userChanged));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    if (avatarChanged || dataChanged)
      window.location.reload();
  };

  if (isMobile || isTablet) {
    return (
      <Layout>
        <article className="profile-edit-wrapper">
          <header>
            <a onClick={() => history.length >= minStackLength ? history.goBack() : history.replace('/')}>
              <MdChevronLeft />
            </a>
            Editar Perfil
          </header>
          <main>
            <form onSubmit={handleSubmit}>
              <fieldset className="avatar">
                <img src={user.avatar || 'https://picsum.photos/150/150'} alt={`Avatar de ${user.name}`} />
                <input type="file" accept="image/*" ref={avatarRef} />
                <button type="button" onClick={() => handleUpload()}>
                  <MdCameraAlt />
                </button>
              </fieldset>
              <fieldset className="input-group">
                <label>Nome</label>
                <input ref={name} type="text" defaultValue={user.name} />
              </fieldset>
              <fieldset className="input-group">
                <label>Email</label>
                <input ref={email} type="email" defaultValue={user.email} />
              </fieldset>
              <fieldset className="input-group">
                <label>Senha</label>
                <input ref={password} type="password" placeholder="******" />
              </fieldset>
              <button type="submit">Atualizar</button>
            </form>
          </main>
        </article>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Editar Dados</h1>
      <form onSubmit={handleSubmit}>
        <div className="avatar">
          <img src={user.avatar || 'https://picsum.photos/150/150'} alt={`Avatar de ${user.name}`} />
          <input type="file" accept="image/*" ref={avatarRef} />
          <button type="button" onClick={() => handleUpload()}>
            <MdCameraAlt />
          </button>
        </div>
        <div className='form-group'>
          <div className="input-group">
            <label>Nome:</label>
            <input ref={name} type="text" defaultValue={user.name} />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input ref={email} type="email" defaultValue={user.email} />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input ref={password} type="password" placeholder="******" />
          </div>
          <button type="submit" className='btn-outlined'><MdModeEdit /> Atualizar</button>
        </div>
      </form>
    </Layout>
  );
}
