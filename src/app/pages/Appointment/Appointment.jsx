import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './Appointment.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';

export default function Appointment() {
  const history = useHistory();
  const { id } = useParams();
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
        if (history.length > 1) {
          history.goBack();
        } else {
          history.replace('/');
        }
      });
  }, [id, token, setData, history]);

  useEffect(() => {
    loadAppointment();
  }, [loadAppointment]);

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
              {/* <p>
                Avaliação:
                {!rate ? <select onChange={({target}) => setRate(target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                  :
                  rate
                }
              </p> */}
              <p>Valor: R$ {data.service.value}</p>
            </li>
          </ol>
        </main>
      </article>
      <Divider size={1} />
    </AppLayout>
  );
}
