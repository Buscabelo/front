import { useCallback, useContext, useEffect, useState } from 'react';
import { MdArrowBack, MdChevronRight, MdEmail, MdStar } from 'react-icons/md';
import Modal from 'react-modal';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import './styles.css';

import AppointmentModal from '../AppointmentModal';
import { getCategoryIcon } from '../../../common/utils/index';
import { AppContext } from '../../../common/context/AppContext';
import { decimalPlaces } from '../../../../constants';

export default function ProviderModal({ show = false, providerId = null, onHide }) {
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  // const [images, setImages] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { categories } = useContext(AppContext);

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

  // const loadImages = useCallback(async service => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API}/${service}/images`);
  //     const { success, images } = response.json();

  //     if (success) {
  //       return images;
  //     }
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.error(error);
  //   }
  // }, []);

  useEffect(() => {
    if (providerId) {
      loadProvider();
      loadServices();
    }
  }, [providerId, loadProvider, loadServices]);

  // useEffect(() => {
  //  if (Array.isArray(services) && services.length) {
  //    const _images = [];
  //    services.map(async service => {
  //      const serviceImages = await loadImages(service.id);
  //      _images.push(serviceImages);
  //    });

  //    setImages(_images);
  //  }
  // }, [services, loadImages]);

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
                Servi??os
              </Tab>
              {/* <Tab>
                Galeria
              </Tab> */}
              <Tab>
                Sobre
              </Tab>
            </TabList>
            <TabPanel>
              {services.some(service => categories.includes(service.type)) && <section className="service-types">
                <ol>
                  {categories.map(category => <li key={category}>
                    <a href="#">
                      {getCategoryIcon(category)}
                      <h3>{category}</h3>
                    </a>
                  </li>)}
                </ol>
              </section>}
              <section className="services">
                <h2>Todos os Servi??os</h2>
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
            {/* <TabPanel>
              <section className="gallery">
                {images.map(image => <img key={image.url} src={image.url} />)}
              </section>
            </TabPanel> */}
            <TabPanel>
              <article className="about">
                {provider.description &&<div className="card">
                  <h3>Descri????o</h3>
                  <p>{provider.description}</p>
                </div>}
                <div className="card">
                  <h3>Contato</h3>
                  <ul>
                    <li><MdEmail /> {provider.email}</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>Endere??o</h3>
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
