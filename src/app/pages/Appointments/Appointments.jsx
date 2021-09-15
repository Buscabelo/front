import { useCallback, useEffect, useState } from 'react';

import './Appointments.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';

function Appointment({ data }) {
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
      .then(response => response.json)
      .then(({ success }) => {
        if (success) {
          location.reload();
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

  return (
    <AppLayout>
      <Divider size={1} />
      {data.length > 0 ?
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
