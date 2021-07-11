import './Appointments.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';

function Appointment({ data }) {
  return (
    <div className="appointment-container">
      <main>
        <h3>{data.service}</h3>
        <p>Data: {data.appointment_to}</p>
        <p><b>{data.provider}</b></p>
        {data.time_done_at && <p><b>Finalizado:</b> {data.time_done_at}</p>}
        {data.canceled_at && <p><b>Cancelado:</b> {data.canceled_at}</p>}
      </main>
      <aside>
        <img src="https://picsum.photos/100/100" alt="icone serviço" />
      </aside>
    </div>
  )
}

export default function Appointments({}) {
  return (
    <AppLayout>
      <Divider size={1} />
      <List
        direction={'horizontal'}
        itemsPerLine={3}
        ItemComponent={Appointment}
        items={[{id: 1, scheduled_at: '2021-07-11T17:15:32-03:00', appointment_to: '2021-07-21T17:15:32-03:00', provider: 'Yan Cortes', service: 'Corte Brabo', time_done_at: '', canceled_at: ''},{id: 2, scheduled_at: '2021-07-11T17:15:32-03:00', appointment_to: '2021-07-21T17:15:32-03:00', provider: 'Yan Cortes', service: 'Corte Brabo', time_done_at: '', canceled_at: ''},{id: 3, scheduled_at: '2021-07-11T17:15:32-03:00', appointment_to: '2021-07-21T17:15:32-03:00', provider: 'Yan Cortes', service: 'Corte Brabo', time_done_at: '', canceled_at: ''},{id: 4, scheduled_at: '2021-07-11T17:15:32-03:00', appointment_to: '2021-07-21T17:15:32-03:00', provider: 'Yan Cortes', service: 'Corte Brabo', time_done_at: '', canceled_at: ''},{id: 5, scheduled_at: '2021-07-11T17:15:32-03:00', appointment_to: '2021-07-21T17:15:32-03:00', provider: 'Yan Cortes', service: 'Corte Brabo', time_done_at: '', canceled_at: ''}]}
      />
      <Divider size={1} />
    </AppLayout>
  )
}
