import { useHistory } from 'react-router';
import { format, parseISO } from 'date-fns';

import './Appointment.css';

const initialPath = 0;

export default function Appointment({ data }) {
  const history = useHistory();
  const { service, provider } = data;
  const token = localStorage.getItem('@buscabelo_client/token');

  const cancelAppointment = () => {
    fetch(`${process.env.REACT_APP_API}/appointments/cancel/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ canceled_at: new Date().toISOString() })
    })
      .then(response => response.json())
      .then(({ success }) => {
        if (success) {
          history.go(initialPath);
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  };

  const renderStatus = () => {
    if (data.time_done_at)
      return <p className='success'><b>Finalizado</b> - {format(parseISO(data.time_done_at), 'dd/MM/y')}</p>;

    if (data.canceled_at)
      return <p className='canceled'><b>Cancelado</b> - {format(parseISO(data.canceled_at), 'dd/MM/y')}</p>;

    return <p>Aberto</p>;
  };

  const renderCancel = () => {
    if (data.time_done_at || data.canceled_at)
      return null;

    return <button type="button" className='button-footer' onClick={() => cancelAppointment()}>Cancelar</button>;
  };

  return (
    <div className="appointment-container">
      <main>
        <div className='container-header'>
          <a href={`/estabelecimento/${provider.id}`}>
            <img src="https://picsum.photos/100/100" alt="icone estabeleciemnto" />
            <div>
              <h2>{provider.name}</h2>
              {renderStatus()}
            </div>
          </a>
        </div>
        <div className='container-item'>
          <p>{service.name} • {format(parseISO(data.appointment_to), 'dd/MM/y')}</p>
        </div>
        <div className='container-footer'>
          <a href={`/agendamento/${data.id}`} className='button-footer'>Ver Detalhes</a>
          {renderCancel()}
        </div>
      </main>
    </div>
  );
}