import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import Modal from 'react-modal';
import { useHistory, useParams } from 'react-router';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './styles.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import { httpCode, minStackLength, decimalPlaces } from '../../../../constants';

const MySwal = withReactContent(Swal);

function ServiceItem({ data }) {
  return (
    <a href={`/servico/${data.id}`} className="wrapper">
      <aside>
        <img src={data.icon} alt="Icone" />
      </aside>
      <main>
        <p>{data.description}</p>
      </main>
    </a>
  );
}

Modal.setAppElement('#root');

export default function Service() {
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const token = localStorage.getItem('@buscabelo_client/token');
  const [data, setData] = useState(null);
  const [services, setServices] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const loadService = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/services/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(({ success, service }) => {
        if (success) {
          setData(service);
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
    loadService();
  }, [loadService]);

  const loadServices = useCallback(() => {
    if (data) {
      fetch(`${process.env.REACT_APP_API}/providers/${data.provider.id}/services`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(({ success, services }) => {
          if (success) {
            setServices(services);
          }
        });
    }
  }, [data, token, setServices]);

  useEffect(() => {
    loadServices();
  }, [data, loadServices]);

  const handleDateClick = ({ dateStr, view }) => {
    if (view.type === 'dayGridMonth') {
      view.calendar.changeView('timeGridDay', dateStr);
    } else if (view.type === 'timeGridDay') {
      setDate(dateStr);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    MySwal.fire({
      title: 'Você deseja marcar horário para este serviço?',
      html: (<>
        <p>Serviço: { data.name }</p>
        <p>Data: {formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
      </>),
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        const body = JSON.stringify({
          scheduled_at: new Date().toISOString(),
          appointment_to: date,
          provider: data.provider.id,
          customer: user.id,
          service: id,
          time_done_at: '',
          canceled_at: ''
        });

        fetch(`${process.env.REACT_APP_API}/appointments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body
        })
          .then(({ status }) => {
            if (status === httpCode.ok) {
              setShowModal(false);
              MySwal.fire('Sucesso!', 'Agendamento cadastrado com sucesso', 'success');
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
      }
    });
  };

  if (!data) {
    return null;
  }

  if (isMobile || isTablet) {
    return <></>;
  }

  return (
    <AppLayout>
      <Divider size={1} />
      <article className="service-wrapper">
        <main>
          <h2>{data.name}</h2>
          <p>R$ {data.value.toFixed(decimalPlaces).replace('.', ',')}</p>
          <p><b>Estabelecimento:</b> {data.provider.name}</p>
          <section>
            <b>Descrição:</b>
            <p>{data.description}</p>
          </section>
          <section className="btn-group">
            {user && <button type="button" onClick={() => openModal()}>Marcar Horário</button>}
            {false && <button type="button" onClick={() => null}>Favoritar</button>}
          </section>
        </main>
        <aside>
          Carrossel
        </aside>
      </article>
      <Divider size={1} />
      <section className="other-services">
        <h3>Outros serviços de {data.provider.name}</h3>
        <Divider size={1} />
        {services && <List
          direction={isMobile ? 'vertical' : 'horizontal'}
          itemsPerLine={2}
          ItemComponent={ServiceItem}
          items={services}
        />}
      </section>
      <Divider size={1} />
      <Modal
        isOpen={showModal}
        contentLabel="Teste"
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          aspectRatio={2}
          initialView="dayGridMonth"
          businessHours={{
            // eslint-disable-next-line no-magic-numbers
            daysOfWeek: [1,2,3,4,5],
            startTime: '07:00',
            endTime: '20:00'
          }}
          weekends={false}
          nowIndicator={true}
          locale='pt'
          selectable={true}
          selectConstraint='businessHours'
          selectOverlap={false}
          headerToolbar={{
            left: 'title',
            right: 'prev,next'
          }}
          dateClick={handleDateClick}
        />
        {date && <button type="button" onClick={handleSubmit}>Finalizar Agendamento</button>}
      </Modal>
    </AppLayout>
  );
}
