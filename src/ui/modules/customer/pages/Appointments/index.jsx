import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory } from 'react-router';
import { MdChevronRight } from 'react-icons/md';
import { parseISO, format } from 'date-fns';

import './styles.css';
import backgroundNoAppointmentList from '../../../../assets/images/undraw/calendar.svg';
import AppLayout from '../../components/AppLayout/AppLayout';
import List from '../../components/List/List';

const initialPath = 0;

function Appointment({ data }) {
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
      return <p className='faild'><b>Cancelado</b> - {format(parseISO(data.canceled_at), 'dd/MM/y')}</p>;

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

export default function Appointments() {
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const token = localStorage.getItem('@buscabelo_client/token');
  const [data, setData] = useState([]);

  const loadAppointments = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/customers/${user.id}/appointments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(({ success, appointments }) => {
        if (success) setData(appointments);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  }, [user.id, token, setData]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  if (isMobile || isTablet) {
    return (
      <article className="appointments-wrapper">
        <h1>Histórico</h1>
        {data.length ?
          <ol>
            {data.map(appointment => (
              <li key={appointment.id}>
                <header>
                  <a href={`/agendamento/${appointment.id}`}>
                    <section className="provider">
                      <img src={appointment.provider.avatar || 'https://picsum.photos/30/30'} />
                      {appointment.provider.name}
                    </section>
                    <MdChevronRight />
                  </a>
                </header>
                <main>
                  <ul>
                    <li>
                      <strong>{appointment.service.name}</strong>
                      <span>
                        {format(parseISO(appointment.appointment_to), 'dd/MM/y')}
                      </span>
                    </li>
                  </ul>
                </main>
              </li>
            ))}
          </ol>
          :
          <p>Você ainda não fez agendamentos</p>
        }
      </article>
    );
  }

  return (
    <AppLayout>
      {data.length ?
        <div>
          <h1 className='title'>Agendamentos</h1>
          <List
            direction={'horizontal'}
            itemsPerLine={3}
            ItemComponent={Appointment}
            items={data}
          />
        </div>
        :
        <div className='noappointments'>
          <img src={backgroundNoAppointmentList} className='image-fundo' alt="backgroundFundo" />
          <h2 className='subtitle'>Você ainda não fez agendamentos</h2>
        </div>
      }
    </AppLayout>
  );
}
