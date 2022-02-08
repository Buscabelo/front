import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory } from 'react-router';
import { MdChevronRight } from 'react-icons/md';
import { parseISO, format } from 'date-fns';

import './styles.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
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
      return <p><b>Finalizado:</b> {data.time_done_at}</p>;

    if (data.canceled_at)
      return <p><b>Cancelado:</b> {data.canceled_at}</p>;

    return <button type="button" onClick={() => cancelAppointment()}>Cancelar</button>;
  };

  return (
    <div className="appointment-container">
      <main>
        <h3>{service.name}</h3>
        <p>Data: {data.appointment_to}</p>
        <p><b>{provider.name}</b></p>
        {renderStatus()}
        <a href={`/agendamento/${data.id}`} style={{ display: 'inline-block', marginBottom: '10px' }}>Ver Detalhes</a>
      </main>
      <aside>
        <img src="https://picsum.photos/100/100" alt="icone serviço" />
      </aside>
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
      <Divider size={1} />
      {data.length ?
        <List
          direction={'horizontal'}
          itemsPerLine={3}
          ItemComponent={Appointment}
          items={data}
        />
        :
        <p>Você ainda não fez agendamentos</p>
      }
      <Divider size={1} />
    </AppLayout>
  );
}
