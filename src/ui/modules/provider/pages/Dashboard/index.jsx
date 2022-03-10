import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import './styles.css';

export default function Dashboard() {

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>

      <div className='container-list'>
        <div className='card'>
          <span className='title-card'>Rendimento (mensal)</span>
          <p className='description-card'>R$ 500</p>
        </div>

        <div className='card'>
          <span className='title-card'>Rendimento (Anual)</span>
          <p className='description-card'>R$ 11500</p>
        </div>

        <div className='card'>
          <span className='title-card'>Agendamentos realizados do mês</span>
          <p className='description-card'>50</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
