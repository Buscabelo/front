import { useCallback, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import ServiceCreateModal from '../../components/ServiceCreateModal';
import ServiceViewModal from '../../components/ServiceViewModal';
import ServiceEditModal from '../../components/ServiceEditModal';
import { AppContext } from '../../../common/context/AppContext';
import './styles.css';

export default function Services() {
  const { token } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadServices = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/services`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { success, services } = await response.json();

      if (success) {
        setServices(services);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadServices();
    }
  }, [loadServices, token]);

  const handleShowService = service => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  const handleEditService = service => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleDeleteService = async service => {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir "${service.name}"?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Excluir',
      denyButtonText: 'Cancelar',
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: 'var(--danger)'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/services/${service.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const { success } = await response.json();

        if (success) {
          Swal.fire('Sucesso!', 'Serviço excluido com sucesso', 'success');
          window.location.reload();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <DashboardLayout>
      <header className="service-creation">
        <button type="button" onClick={() => setShowCreateModal(true)}>Criar Serviço</button>
      </header>
      <table className="services-list">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => <tr key={service.id}>
            <td>{service.name}</td>
            <td>{service.value}</td>
            <td>{service.type}</td>
            <td>
              <button type="button" className="info" onClick={() => handleShowService(service)}>Visualizar</button>
              <button type="button" className="warning" onClick={() => handleEditService(service)}>Editar</button>
              <button type="button" className="danger" onClick={() => handleDeleteService(service)}>Excluir</button>
            </td>
          </tr>)}
        </tbody>
      </table>
      <ServiceCreateModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
      <ServiceViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        service={selectedService}
      />
      <ServiceEditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        service={selectedService}
      />
    </DashboardLayout>
  );
}
