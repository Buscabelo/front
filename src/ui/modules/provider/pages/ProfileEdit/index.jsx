import { MdCameraAlt, MdModeEdit } from 'react-icons/md';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

export default function ProfileEdit() {
  return (
    <DashboardLayout>
      <h1>Editar Dados</h1>
      <form className="profile-edit">
        <div className="avatar">
          <img src={false || 'https://picsum.photos/150/150'} alt={'Avatar de usuario'} />
          <input type="file" accept="image/*" />
          <button type="button">
            <MdCameraAlt />
          </button>
        </div>
        <div className='form-group'>
          <div className="input-group">
            <label>Nome:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" />
          </div>

          <div className="input-group">
            <label>Descrição:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Endereço:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Senha:</label>
            <input type="password" placeholder="******" />
          </div>
          <button type="submit" className='btn-outlined'><MdModeEdit /> Atualizar</button>
        </div>
      </form>
    </DashboardLayout>
  );
}