import { useCallback, useEffect, useState } from 'react';

import './Appointments.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';

function Appointment({ data }) {
  const { service, provider } = data;

  return (
    <div className="appointment-container">
      <main>
        <h3>{service.name}</h3>
        <p>Data: {data.appointment_to}</p>
        <p><b>{provider.name}</b></p>
        {data.time_done_at && <p><b>Finalizado:</b> {data.time_done_at}</p>}
        {data.canceled_at && <p><b>Cancelado:</b> {data.canceled_at}</p>}
      </main>
      <aside>
        <img src="https://picsum.photos/100/100" alt="icone serviço" />
      </aside>
    </div>
  )
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
      .then((response) => response.json())
      .then((data) => {
        const appointments = data.map(d => d.appointment);
        setData(appointments)
      })
      .catch((error) => console.error(error))
  }, [user, token, setData]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments])

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
  )
}
