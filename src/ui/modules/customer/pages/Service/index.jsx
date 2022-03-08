import { useCallback, useContext, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory, useParams } from 'react-router';
import { FaStar, FaRegCalendarCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Layout from '../../../common/components/CustomerLayout';
import List from '../../components/List/List';
import { AppContext } from '../../../common/context/AppContext';

import './styles.css';
import { httpCode, minStackLength, decimalPlaces } from '../../../../constants';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '0',
    bottom: '-10%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
};

const MySwal = withReactContent(Swal);

function ServiceItem({ data }) {
  return (
    <div className='container-service-item'>
      <a href={`/servico/${data.id}`} className="wrapper">
        {/* <img src={data.icon} alt="Icone" /> */}
        <aside>
          <img src="https://picsum.photos/100/100" alt="icone estabeleciemnto" />
        </aside>
        <div className='service-info'>
          <h2>{data.name}</h2>
          <small><FaStar /> 4.0</small>
          <small>R$ {data.value.toFixed(decimalPlaces).replace('.', ',')}</small>
        </div>
      </a>
    </div>
  );
}

Modal.setAppElement('#root');

export default function Service() {
  const history = useHistory();
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [services, setServices] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  }

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
    return null;
  }

  return (
    <Layout>
      <article className="service-wrapper">
        <main>
          <h2>{data.name}</h2>
          <section className='service-info'>
            <a href='#'>
              <img src="https://picsum.photos/100/100" alt="icone estabeleciemnto" />
              {data.provider.name}
            </a>
            <p><b>Descrição:</b> {data.description}</p>
            <p>R$ {data.value.toFixed(decimalPlaces).replace('.', ',')}</p>
          </section>
          <section className="btn-group">
            {user && <button type="button" className='btn' onClick={() => openModal()}><FaRegCalendarCheck /> Marcar Horário</button>}
            {true && <button type="button" className='btn' onClick={() => null}><FaStar /> Favoritar</button>}
          </section>
        </main>
        <aside>
          <img src='https://picsum.photos/500/300' alt='serviço' />
        </aside>
      </article>
      <section className="other-services">
        <h3>Outros serviços de {data.provider.name}</h3>
        {services && <List
          direction={'horizontal'}
          itemsPerLine={4}
          itemsMaxPerLine={4}
          ItemComponent={ServiceItem}
          items={services}
        />}
      </section>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="agenda"
      >
        <button type='button' onClick={closeModal} className='btn-link'><MdClose /></button>
        <div className='fullCalendar'>
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
        </div>
        {date && <button type="button" className='btn btn-finalizar' onClick={handleSubmit}>Finalizar Agendamento</button>}
      </Modal>
    </Layout>
  );
}
