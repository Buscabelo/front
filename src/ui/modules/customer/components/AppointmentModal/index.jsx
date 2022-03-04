import { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdClose, MdDone } from 'react-icons/md';
import Modal from 'react-modal';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { addHours, addMinutes, eachHourOfInterval, endOfDay, format, formatISO, startOfDay, subHours } from 'date-fns';
import clsx from 'clsx';
import Swal from 'sweetalert2';

import './styles.css';
import Calendar from '../Calendar';
import { decimalPlaces } from '../../../../constants';

const firstIndex = 0;
const lastIndex = 1;
const before = -1;
const after = 1;
const halfHour = 30;
const minBusinessHour = 7;
const lastBusinessHour = 3;

export default function AppointmentModal({ show, service, provider, onHide }) {
  const [step, setStep] = useState(firstIndex);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const token = localStorage.getItem('@buscabelo_client/token');

  useEffect(() => {
    if (selectedDate === null) {
      setSelectedHour(null);
    }
  }, [selectedDate]);

  const handleAppointment = async step_pass => {
    if (step === lastIndex && step_pass === after) {
      const body = JSON.stringify({
        scheduled_at: formatISO(new Date()),
        appointment_to: formatISO(addHours(startOfDay(selectedDate), +selectedHour)),
        provider: provider.id,
        customer: user.id,
        service: service.id,
        time_done_at: '',
        canceled_at: ''
      });

      try {
        const response = await fetch(`${process.env.REACT_APP_API}/appointments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body
        });
        const { success } = await response.json();
        if (success) {
          Swal.fire('Sucesso!', 'Agendamento cadastrado com sucesso', 'success');
          setStep(firstIndex);
          setSelectedDate(null);
          setSelectedHour(null);
          onHide();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } else {
      const _step = step + step_pass;
      setStep(_step);
    }
  };

  if (service === null || provider === null)
    return null;

  const renderScheduled = () => {
    if (selectedDate && selectedHour) {
      const day = format(selectedDate, 'dd/MM/y');
      const baseHour = addHours(startOfDay(selectedDate), +selectedHour);
      const from = format(baseHour, 'HH:mm');
      const to = format(addMinutes(baseHour, halfHour), 'HH:mm');

      return <>
        {day} ({from} - {to})
      </>;
    }
  };

  return (
    <Modal
      isOpen={show}
      className="appointment-modal"
    >
      <Tabs selectedIndex={step} onSelect={() => null}>
        <header>
          <button type="button" onClick={() => onHide()}>
            <MdClose />
          </button>
          <h2>Agendamento</h2>
          <TabList>
            <Tab>
              Escolher horário
            </Tab>
            <Tab>
              Confirmar pedido
            </Tab>
          </TabList>
        </header>
        <main>
          <TabPanel>
            <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
            {selectedDate && <div className="card">
              <h3>Horários</h3>
              <ol className="schedules">
                {eachHourOfInterval({ start: addHours(startOfDay(selectedDate), minBusinessHour), end: subHours(endOfDay(selectedDate), lastBusinessHour) }).map(date => (
                  <li
                    key={date}
                    className={clsx({ 'active': selectedHour === format(date, 'HH') })}
                    onClick={() => setSelectedHour(format(date, 'HH'))}
                  >
                    {format(date, 'HH:mm')} - {format(addMinutes(date, halfHour), 'HH:mm')}
                  </li>
                ))}
              </ol>
            </div>}
          </TabPanel>
          <TabPanel>
            <div className="avatar-card">
              <section className="provider">
                <img src={provider.avatar || 'https://picsum.photos/50/50'} />
                <h3>{provider.name}</h3>
                {provider.address && <p>{provider.address}</p>}
              </section>
              {selectedDate && selectedHour && <section className="schedule">
                <ul>
                  <li>
                    <strong>{service.name}</strong>
                    <span>
                      {renderScheduled()}
                    </span>
                  </li>
                </ul>
              </section>}
              <section className="payment">
                <h3>Total</h3>
                <b>R$ {service.value.toFixed(decimalPlaces).replace('.', ',')}</b>
              </section>
            </div>
          </TabPanel>
        </main>
        {selectedHour && <footer>
          <button type="button" onClick={() => handleAppointment(after)}>
            {step === lastIndex ? <>
              Finalizar Pedido <MdDone />
            </> : <>
              Avançar <MdChevronRight />
            </>}
          </button>
          {step > firstIndex && <button type="button" onClick={() => handleAppointment(before)}>
            <MdChevronLeft /> Voltar
          </button>}
        </footer>}
      </Tabs>
    </Modal>
  );
}
