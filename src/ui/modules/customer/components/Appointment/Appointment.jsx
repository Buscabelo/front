import React from 'react';
import { useHistory } from 'react-router';
import { format, parseISO } from 'date-fns';
import { MdCheckCircle, MdClose } from 'react-icons/md';
import Modal from 'react-modal';

import './Appointment.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
};

const decimalPlaces = 2;
const initialPath = 0;

Modal.setAppElement(document.getElementById('root'));

export default function Appointment({ data }) {
  const history = useHistory();
  const { service, provider } = data;
  const token = localStorage.getItem('@buscabelo_client/token');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const cancelAppointment = () => {
    fetch(`${process.env.REACT_APP_API}/appointments/cancel/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ canceled_at: new Date().toISOString() })
    })
      .then(response => response.json())
      .then(({ success }) => {
        if (success) {
          history.go(initialPath);
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  };

  const renderStatus = () => {
    if (data.time_done_at)
      return <p className='success'><b>Finalizado</b> - {format(parseISO(data.time_done_at), 'dd/MM/y')}</p>;

    if (data.canceled_at)
      return <p className='canceled'><b>Cancelado</b> - {format(parseISO(data.canceled_at), 'dd/MM/y')}</p>;

    return <p>Aberto</p>;
  };

  const renderCancel = () => {
    if (data.time_done_at || data.canceled_at)
      return null;

    return <button type="button" className='button-footer' onClick={() => cancelAppointment()}>Cancelar</button>;
  };

  const renderIcon = () => {
    if (data.time_done_at)
      return <MdCheckCircle color="green" />;

    if (data.canceled_at)
      return <MdClose color="red" />;

    return null;
  };

  return (
    <div className="appointment-container">
      <main>
        <div className='container-header'>
          <a href={`/estabelecimento/${provider.id}`}>
            <img src="https://picsum.photos/100/100" alt="icone estabeleciemnto" />
            <div>
              <h2>{provider.name}</h2>
              {renderStatus()}
            </div>
          </a>
        </div>
        <div className='container-item'>
          <p>{service.name} • {format(parseISO(data.appointment_to), 'dd/MM/y')}</p>
        </div>
        <div className='container-footer'>
          <a href="#" onClick={openModal} className='button-footer'>Ver Detalhes</a>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <button type='button' onClick={closeModal} className="btn-link">
              <MdClose />
            </button>
            <div className="appointment-wrapper">
              <nav>
                <h1>Detalhe do pedido</h1>
              </nav>
              <header>
                <section className="provider">
                  <img src={provider.avatar || 'https://picsum.photos/30/30'} />
                  <b>{provider.name}</b>
                </section>
                <section className="appointment">
                  Realizada às {format(parseISO(data.scheduled_at), 'H:mm - dd/MM/y')}
                  <a href={`/estabelecimento/${provider.id}`} className='btn-link'>
                    Ver serviços
                  </a>
                </section>
                <section className="status">
                  {renderIcon()} Serviço {renderStatus()}
                </section>
              </header>
              <main>
                <section className="appointment">
                  <ul>
                    <li>
                      <strong>{service.name}</strong>
                      <span>
                        {format(parseISO(data.appointment_to), 'dd/MM/y')}
                      </span>
                    </li>
                  </ul>
                </section>
                <section className="payment">
                  <h3>Total</h3>
                  <b>R$ {service.value.toFixed(decimalPlaces).replace('.', ',')}</b>
                </section>
              </main>
            </div>
          </Modal>
          {renderCancel()}
        </div>
      </main>
    </div>
  );
}