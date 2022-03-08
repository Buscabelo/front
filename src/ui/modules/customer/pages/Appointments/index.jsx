import { useCallback, useContext, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { MdChevronRight } from 'react-icons/md';
import { format, formatISO, parseISO } from 'date-fns';

import backgroundNoAppointmentList from '../../../../assets/images/undraw/calendar.svg';
import Layout from '../../../common/components/CustomerLayout';
import List from '../../components/List/List';
import Appointment from '../../components/Appointment/Appointment';
import { AppContext } from '../../../common/context/AppContext';

import './styles.css';

const initialPath = 0;

export default function Appointments() {
  const { user, token } = useContext(AppContext);
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
    const renderStatus = appointment => {
      if (appointment.time_done_at)
        return <span className="success">Finalizado</span>;

      if (appointment.canceled_at)
        return <span className="canceled">Cancelado</span>;

      return <span>Aberto</span>;
    };

    const cancelAppointment = async id => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/appointments/cancel/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ canceled_at: formatISO(new Date()) })
        });
        const { success } = await response.json();

        if (success) {
          history.go(initialPath);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    return (
      <Layout>
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
                        <div className="appointment-info">
                          <b>{appointment.provider.name}</b>
                          {renderStatus(appointment)}
                        </div>
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
                  {!appointment.time_done_at && !appointment.canceled_at && <footer>
                    <button type="button" onClick={() => cancelAppointment(appointment.id)}>Cancelar</button>
                  </footer>}
                </li>
              ))}
            </ol>
            :
            <p>Você ainda não fez agendamentos</p>
          }
        </article>
      </Layout>
    );
  }

  return (
    <Layout>
      {data.length ?
        <div>
          <h1 className='title'>Agendamentos</h1>
          <div className='body-list'>
            <List
              direction={'horizontal'}
              itemsPerLine={3}
              ItemComponent={Appointment}
              items={data}
            />
          </div>
        </div>
        :
        <div className='noappointments'>
          <img src={backgroundNoAppointmentList} className='image-fundo' alt="backgroundFundo" />
          <h2 className='subtitle'>Você ainda não fez agendamentos</h2>
        </div>
      }
    </Layout>
  );
}
