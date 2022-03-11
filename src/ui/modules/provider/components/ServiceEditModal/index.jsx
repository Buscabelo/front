import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { AppContext } from '../../../common/context/AppContext';
import './styles.css';

export default function ServiceEditModal({ show, onHide, service }) {
  const { user, token } = useContext(AppContext);
  const name = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const type = useRef(null);
  const [types, setTypes] = useState([]);

  const loadTypes = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/services/types`);
      const { success, types } = await response.json();

      if (success) {
        setTypes(types);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadTypes();
  }, [loadTypes]);

  const handleSubmit = async () => {
    try {
      const body = JSON.stringify({
        name: name.current.value && name.current.value !== service.name ? name.current.value : service.name,
        description: description.current.value && description.current.value !== service.description ? description.current.value : service.description,
        value: price.current.value && +price.current.value !== service.value ? price.current.value : service.value,
        type: type.current.value && type.current.value !== service.type ? type.current.value : service.type,
        provider: user.id,
      });
      const response = await fetch(`${process.env.REACT_APP_API}/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body
      });
      const { success } = await response.json();

      if (success) {
        Swal.fire('Sucesso!', 'Serviço atualizado com sucesso', 'success');
        onHide();
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  Modal.setAppElement('#root');

  if (service === null)
    return null;

  return (
    <Modal
      isOpen={show}
      className="edit-service-modal"
      overlayClassName="edit-service-modal-overlay"
    >
      <header>
        <h2>Alterar Serviço</h2>
        <button type="button" onClick={() => onHide()}>
          <MdClose />
        </button>
      </header>
      <main>
        <form>
          <fieldset>
            <label>Nome do Serviço</label>
            <input ref={name} type="text" defaultValue={service.name} />
          </fieldset>
          <fieldset>
            <label>Descrição</label>
            <textarea ref={description} rows="4" defaultValue={service.description} />
          </fieldset>
          <fieldset>
            <label>Tipo</label>
            <select ref={type} defaultValue={service.type}>
              {types.map(type => <option key={type}>{type}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <label>Preço</label>
            <input ref={price} type="text" defaultValue={service.value} />
          </fieldset>
        </form>
      </main>
      <footer>
        <button type="button" className="btn-danger" onClick={() => onHide()}>Cancelar</button>
        <button type="button" onClick={() => handleSubmit()}>Cadastrar</button>
      </footer>
    </Modal>
  );
}
