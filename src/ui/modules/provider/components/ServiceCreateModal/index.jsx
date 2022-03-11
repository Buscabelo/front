import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { AppContext } from '../../../common/context/AppContext';
import './styles.css';

export default function ServiceCreateModal({ show, onHide }) {
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
        name: name.current.value,
        description: description.current.value,
        value: price.current.value,
        type: type.current.value,
        provider: user.id,
      });
      const response = await fetch(`${process.env.REACT_APP_API}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body
      });
      const { success } = await response.json();

      if (success) {
        Swal.fire('Sucesso!', 'Serviço cadastrado com sucesso', 'success');
        onHide();
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={show}
      className="new-service-modal"
      overlayClassName="new-service-modal-overlay"
    >
      <header>
        <h2>Novo Serviço</h2>
        <button type="button" onClick={() => onHide()}>
          <MdClose />
        </button>
      </header>
      <main>
        <form>
          <fieldset>
            <label>Nome do Serviço</label>
            <input ref={name} type="text" />
          </fieldset>
          <fieldset>
            <label>Descrição</label>
            <textarea ref={description} rows="4" />
          </fieldset>
          <fieldset>
            <label>Tipo</label>
            <select ref={type}>
              {types.map(type => <option key={type}>{type}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <label>Preço</label>
            <input ref={price} type="text" />
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
