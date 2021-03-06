import { useCallback, useContext, useEffect, useState } from 'react';
import { format, parseISO, formatISO } from 'date-fns';

import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { AppContext } from '../../../common/context/AppContext';
import './styles.css';

export default function Appointments() {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { success, appointments } = await response.json();

      if (success) {
        setAppointments(appointments);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadAppointments();
    }
  }, [loadAppointments, token]);

  async function handleFinish(appointment_id) {
    try {
      const body = JSON.stringify({
        time_done_at: formatISO(new Date())
      });
      const response = await fetch(`${process.env.REACT_APP_API}/appointments/finish/${appointment_id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body
      });
      const { success } = await response.json();

      if (success) {
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function handleCancel(appointment_id) {
    try {
      const body = JSON.stringify({
        canceled_at: formatISO(new Date())
      });
      const response = await fetch(`${process.env.REACT_APP_API}/appointments/cancel/${appointment_id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body
      });
      const { success } = await response.json();

      if (success) {
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const renderStatus = appointment => {
    if (!appointment.canceled_at && !appointment.time_done_at)
      return (
        <>
          <button type="button" className="danger" onClick={() => handleCancel(appointment.id)}>Cancelar</button>
          <button type="button" className="success" onClick={() => handleFinish(appointment.id)}>Finalizar</button>
        </>
      );

    if (appointment.canceled_at)
      return (
        <>
          <span className="text-danger">Cancelado</span> em {format(parseISO(appointment.canceled_at), 'd/MM/y H:m:s')}
        </>
      );

    if (appointment.time_done_at)
      return (
        <>
          <span className="text-success">Finalizado</span> em {format(parseISO(appointment.time_done_at), 'd/MM/y H:m:s')}
        </>
      );
  };

  return (
    <DashboardLayout>
      <table className="appointments-list">
        <thead>
          <tr>
            <th>Usu??rio</th>
            <th>Servi??o</th>
            <th>Agendado em</th>
            <th>Agendado para</th>
            <th>A????es</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => <tr key={appointment.id}>
            <td>
              <img src={appointment.customer.avatar || 'https://picsum.photos/50/50'} />
              {appointment.customer.name}
            </td>
            <td>{appointment.service.name}</td>
            <td>{format(parseISO(appointment.scheduled_at), 'dd/MM/y H:mm')}</td>
            <td>{format(parseISO(appointment.appointment_to), 'dd/MM/y H:mm')}</td>
            <td>
              {renderStatus(appointment)}
            </td>
          </tr>)}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
