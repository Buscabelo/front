import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory, useParams } from 'react-router-dom';
import { MdCheckCircle, MdChevronLeft, MdClose, MdStar } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';
import { minStackLength } from '../../../../constants/history';

const starsLength = 5;
const decimalPlaces = 2;

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

  // const rateAppointment = event => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const body = Object.fromEntries(formData.entries());
  //   body.appointment = data.id;
  //   body.customer = user.id;

  //   if (body.rating_number) {
  //     fetch(`${process.env.REACT_APP_API}/appointments/${data.id}/rate`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(body)
  //     })
  //       .then(response => response.json())
  //       .then(({ success, rating }) => {
  //         if (success) {
  //           const _data = data;
  //           _data.rate = +rating.rating_number;
  //           setData(_data);
  //         }
  //       })
  //       .catch(error => {
  //         // eslint-disable-next-line no-console
  //         console.error(error);
  //       });
  //   }
  // };

  if (!data)
    return null;

  // essa parte comentada é pra vc (joao) ver se vai usar alguma coisa que esta aqui, se não for usar pode apagar!!!

  // const renderStatus = () => {
  //   if (data.time_done_at)
  //     return <span className="done">Finalizado</span>;

  //   if (data.canceled_at)
  //     return <span className="canceled">Cancelado</span>;

  //   return null;
  // };

  // const renderDate = () => {
  //   if (data.time_done_at)
  //     return <p><b>Finalizado em: </b> {data.time_done_at}</p>;

  //   if (data.canceled_at)
  //     return <p><b>Cancelado em: </b> {data.canceled_at}</p>;

  //   return null;
  // };

  // const renderRate = () => {
  //   if (data.rate)
  //     return data.rate;

  //   return (
  //     <>
  //       <p style={{marginBottom: '15px'}}>Avaliação:</p>
  //       <form style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} onSubmit={event => rateAppointment(event)}>
  //         <select style={{marginBottom: '15px'}} name="rating_number">
  //           <option value="">Avalie o seu agendamento</option>
  //           <option value="5">Excelente</option>
  //           <option value="4">Bom</option>
  //           <option value="3">Pode Melhorar</option>
  //           <option value="2">Ruim</option>
  //           <option value="1">Péssimo</option>
  //         </select>
  //         <textarea name="description" style={{padding: '1vh 0.5vw', marginBottom: '15px', resize: 'none'}} rows="8" cols="35" />
  //         <button type="submit">Enviar</button>
  //       </form>
  //     </>
  //   );
  // };

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

    return <Layout>
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
                  {format(parseISO(data.appointment_to), 'dd/MM/y')}
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
    </Layout>;
  }

  return (
    <></>
  );
}
