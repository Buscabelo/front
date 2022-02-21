import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory, useParams } from 'react-router-dom';
import { MdCheckCircle, MdChevronLeft, MdClose, MdStar } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';
import { minStackLength, decimalPlaces } from '../../../../constants';

const starsLength = 5;

export default function AppointmentDetail() {
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
      }
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

  if (!data)
    return null;

  if (isMobile || isTablet) {
    const renderStatus = () => {
      if (data.time_done_at)
        return <>concluído às {format(parseISO(data.time_done_at), 'H:mm - dd/MM/y')}</>;

      if (data.canceled_at)
        return <>cancelado às {format(parseISO(data.canceled_at), 'H:mm - dd/MM/y')}</>;

      return null;
    };

    const renderIcon = () => {
      if (data.time_done_at)
        return <MdCheckCircle color="green" />;

      if (data.canceled_at)
        return <MdClose color="red" />;

      return null;
    };

    const setRate = async rate => {
      try {
        const body = {
          appointment: data.id,
          customer: user.id,
          rating_number: rate
        };
        const response = await fetch(`${process.env.REACT_APP_API}/appointments/${data.id}/rate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });
        const { success, rating } = await response.json();

        if (success) {
          const _data = data;
          _data.rate = +rating.rating_number;
          setData(_data);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    const renderRate = () => {
      if (data.rate)
        return <>
          <h3>Sua avaliação ao pedido</h3>
          <section className="stars">
            {[...Array(starsLength)].map((_, index) => (
              <span
                key={++index}
                className={++index <= data.rate ? 'on' : ''}
              >
                <MdStar />
              </span>
            ))}
          </section>
        </>;

      return <>
        <h3>Avalie seu pedido</h3>
        <section className="stars">
          {[...Array(starsLength)].map((_, index) => (
            <span
              key={++index}
              onClick={() => setRate(++index)}
            >
              <MdStar />
            </span>
          ))}
        </section>
        <p>Escolha de 1 a 5 estrelas para classificar</p>
      </>;
    };

    return (
      <Layout>
        <article className="appointment-wrapper">
          <nav>
            <a onClick={() => history.length >= minStackLength ? history.goBack() : history.replace('/')}>
              <MdChevronLeft />
            </a>
            <h1>Detalhes do Pedido</h1>
          </nav>
          <header>
            <section className="provider">
              <img src={data.provider.avatar || 'https://picsum.photos/30/30'} />
              <b>{data.provider.name}</b>
            </section>
            <section className="appointment">
              Realizada às {format(parseISO(data.scheduled_at), 'H:mm - dd/MM/y')}
              <a href="#">Ver serviços</a>
            </section>
            <section className="status">
              {renderIcon()} Serviço {renderStatus()}
            </section>
          </header>
          <main>
            <section className="appointment">
              <ul>
                <li>
                  <strong>{data.service.name}</strong>
                  <span>
                    {format(parseISO(data.appointment_to), 'dd/MM/y - HH:mm')}
                  </span>
                </li>
              </ul>
            </section>
            <section className="payment">
              <h3>Total</h3>
              <b>R$ {data.service.value.toFixed(decimalPlaces).replace('.', ',')}</b>
            </section>
          </main>
          {data.canceled_at && <footer>
            <section className="rate">
              {renderRate()}
            </section>
          </footer>}
        </article>
      </Layout>
    );
  }

  history.replace('/');
}
