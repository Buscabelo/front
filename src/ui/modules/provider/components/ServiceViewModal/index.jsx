import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';

import './styles.css';

export default function ServiceViewModal({ show, onHide, service }) {
  Modal.setAppElement('#root');

  if (service === null)
    return null;

  return (
    <Modal
      isOpen={show}
      className="view-service-modal"
      overlayClassName="view-service-modal-overlay"
    >
      <header>
        <h2>Serviço {service.name}</h2>
        <button type="button" onClick={() => onHide()}>
          <MdClose />
        </button>
      </header>
      <main>
        <section>
          <b>Descrição:</b>
          <p>{service.description}</p>
        </section>
        <section>
          <b>Preço:</b>
          <span>R$ {service.value}</span>
        </section>
      </main>
    </Modal>
  );
}
