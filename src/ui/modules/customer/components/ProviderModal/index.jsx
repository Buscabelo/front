import { useCallback, useEffect, useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { MdArrowBack, MdChevronRight, MdEmail, MdStar } from 'react-icons/md';
import Modal from 'react-modal';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import './styles.css';

import AppointmentModal from '../AppointmentModal';
import { decimalPlaces } from '../../../../constants';

export default function ProviderModal({ show = false, providerId = null, onHide }) {
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const loadProvider = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/providers/${providerId}`);
      const { success, provider } = await response.json();

      if (success)
        setProvider(provider);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [providerId]);

  const loadServices = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/providers/${providerId}/services`);
      const { success, services } = await response.json();

      if (success)
        setServices(services);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [providerId]);

  useEffect(() => {
    if (providerId) {
      loadProvider();
      loadServices();
    }
  }, [providerId, loadProvider, loadServices]);

  const renderStatus = () => <span className="closed">Fechado</span>;

  if (!provider || providerId === null)
    return null;

  Modal.setAppElement(document.getElementById('root'));

  return (
    <>
      <Modal
        isOpen={show}
        className="provider-modal"
      >
        <header>
          <button type="button" onClick={() => onHide()}>
            <MdArrowBack />
          </button>
          <img src="https://picsum.photos/500/250" />
          <section>
            <span>{provider.name}</span>
            <div>
              {provider.rating && <>
                {provider.rating} <MdStar />
              </>}
              {renderStatus()}
            </div>
          </section>
        </header>
        <main>
          <Tabs>
            <TabList>
              <Tab>
                Serviços
              </Tab>
              <Tab>
                Galeria
              </Tab>
              <Tab>
                Sobre
              </Tab>
            </TabList>
            <TabPanel>
              <section className="service-types">
                <ol>
                  <li>
                    <a href="#">
                      <FaInstagram />
                      <h3>Corte</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram />
                      <h3>Tintura</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram />
                      <h3>Maquiagem</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram />
                      <h3>Skin Care</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram />
                      <h3>Skin Care</h3>
                    </a>
                  </li>
                </ol>
              </section>
              <section className="services">
                <h2>Todos os Serviços</h2>
                <ul>
                  {services.map(service => (
                    <li key={service.id} onClick={() => setSelectedService(service)}>
                      <img src="https://picsum.photos/70/70" />
                      <main>
                        <b>{service.name}</b>
                        R$ {service.value.toFixed(decimalPlaces).replace('.', ',')}
                      </main>
                      <aside onClick={() => null}>
                        <MdChevronRight />
                      </aside>
                    </li>
                  ))}
                </ul>
              </section>
            </TabPanel>
            <TabPanel>
              Ainda não implementado
            </TabPanel>
            <TabPanel>
              <article className="about">
                {provider.description &&<div className="card">
                  <h3>Descrição</h3>
                  <p>{provider.description}</p>
                </div>}
                <div className="card">
                  <h3>Contato</h3>
                  <ul>
                    <li><MdEmail /> {provider.email}</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>Endereço</h3>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                    height="400"
                    frameBorder="0"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  />
                </div>
              </article>
            </TabPanel>
          </Tabs>
        </main>
      </Modal>
      <AppointmentModal
        show={selectedService !== null}
        provider={provider}
        service={selectedService}
        onHide={() => setSelectedService(null)}
      />
    </>
  );
}
