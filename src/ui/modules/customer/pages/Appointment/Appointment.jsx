import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './Appointment.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import { minStackLength } from '../../../../constants/history';

export default function Appointment() {
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const token = localStorage.getItem('@buscabelo_client/token');
  const [data, setData] = useState(null);

  const loadAppointment = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/appointments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(({ success, appointment }) => {
        if (success) {
          setData(appointment);
        }
      })
      .catch(() => {
        if (history.length >= minStackLength) {
          history.goBack();
        } else {
          history.replace('/');
        }
      });
  }, [id, token, setData, history]);

  useEffect(() => {
    loadAppointment();
  }, [loadAppointment]);

  const rateAppointment = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData.entries());
    body.appointment = data.id;
    body.customer = user.id;

    if (body.rating_number) {
      fetch(`${process.env.REACT_APP_API}/appointments/${data.id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
	      body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(({ success, rating }) => {
          if (success) {
            const _data = data;
            _data.rate = +rating.rating_number;
            setData(_data);
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
  };

  if (!data)
    return null;

  const renderStatus = () => {
    if (data.time_done_at)
      return <span className="done">Finalizado</span>;

    if (data.canceled_at)
      return <span className="canceled">Cancelado</span>;

    return null;
  };

  const renderDate = () => {
    if (data.time_done_at)
      return <p><b>Finalizado em: </b> {data.time_done_at}</p>;

    if (data.canceled_at)
      return <p><b>Cancelado em: </b> {data.canceled_at}</p>;

    return null;
  };

  const renderRate = () => {
    if (data.rate)
      return data.rate;

    return (
      <>
        <p style={{marginBottom: '15px'}}>Avaliação:</p>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} onSubmit={event => rateAppointment(event)}>
          <select style={{marginBottom: '15px'}} name="rating_number">
            <option value="">Avalie o seu agendamento</option>
            <option value="5">Excelente</option>
            <option value="4">Bom</option>
            <option value="3">Pode Melhorar</option>
            <option value="2">Ruim</option>
            <option value="1">Péssimo</option>
          </select>
          <textarea name="description" style={{padding: '1vh 0.5vw', marginBottom: '15px', resize: 'none'}} rows="8" cols="35" />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  };

  return (
    <AppLayout>
      <Divider size={1} />
      <article className="item-container">
        <header>
          <h1>{data.provider.name} {renderStatus()}</h1>
          <p>Data do Agendamento: {data.appointment_to}</p>
        </header>
        <main>
          <ol>
            <li>
              <h2>{data.service.name}</h2>
              {renderDate()}
              {data.time_done_at && renderRate()}
              <p>Valor: R$ {data.service.value}</p>
            </li>
          </ol>
        </main>
      </article>
      <Divider size={1} />
    </AppLayout>
  );
}
