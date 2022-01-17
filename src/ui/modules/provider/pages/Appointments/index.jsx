import { useEffect, useState, useContext } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Card, Typography, Modal } from 'antd';

import FlexlistWrapper from '../../components/FlexlistWrapper/FlexlistWrapper';
import { ResponseHandlerContext } from '../../context/ResponseHandlerContext';

const { Title, Text } = Typography;

export default function ListAppointments() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(true);

  const { query, responseMessage } = useContext(ResponseHandlerContext);

  useEffect(() => {
    (async() => {
      const { response, statusCode } = await query({
        link: `${process.env.REACT_APP_BACKEND_AD}/appointments`,
        method: 'GET',
        auth: true,
      });

      if (response) {
        responseMessage({statusCode});
        setAppointments(response?.appointments || []);
      }
    })();
  }, [query, responseMessage, forceUpdate]);

  async function handleSelectAppointment({id}) {
    const { response } = await query({
      link: `${process.env.REACT_APP_BACKEND_AD}/appointments/${id}`,
      method: 'GET',
      auth: true,
    });

    setSelectedAppointment(response?.appointment || []);
    setIsModalVisible(true);
  }

  async function handleFinishService({id, target}) {
    if (!target) {
      setIsModalVisible(false);
    } else if (target === 'Finalizar') {
      const { response, statusCode } = await query({
        link: `${process.env.REACT_APP_BACKEND_AD}/appointments/finish/${id}`,
        method: 'PATCH',
        auth: true,
        body: JSON.stringify({ time_done_at: new Date().toISOString() })
      });

      setForceUpdate(!forceUpdate);
      responseMessage({ statusCode, response });
      setIsModalVisible(false);
    }
  }

  async function handleCancelService({id, target}) {
    if (!target) {
      setIsModalVisible(false);
    } else if (target === 'Cancelar') {
      const { statusCode } = await query({
        link: `${process.env.REACT_APP_BACKEND_AD}/appointments/cancel/${id}`,
        method: 'PATCH',
        auth: true,
        body: JSON.stringify({ canceled_at: new Date().toISOString() })
      });

      setForceUpdate(!forceUpdate);
      responseMessage({ statusCode });
      setIsModalVisible(false);
    }
  }

  if (isMobile || isTablet) {
    return null;
  }

  return (
    <>
      {
        selectedAppointment ?
          <Modal
            cancelButtonProps={{danger: true, disabled: selectedAppointment.canceled_at || selectedAppointment.time_done_at ? true : false }}
            okButtonProps={{ disabled: selectedAppointment.canceled_at || selectedAppointment.time_done_at ? true : false }}
            title="Agendamento"
            visible={isModalVisible}
            okText={'Finalizar'}
            cancelText={'Cancelar'}
            onOk={e => handleFinishService({id: selectedAppointment.id, target: e.target.innerText})}
            onCancel={e => handleCancelService({id: selectedAppointment.id, target: e.target.innerText})}>
            <p>{selectedAppointment.customer.name}</p>
            <p>R$ {selectedAppointment.service.value}</p>
            Agendado para <Text strong>{(() => {
              const d = new Date(selectedAppointment.appointment_to);
              const [data,] = d.toLocaleString().split(' ');
              return data;
            })()}</Text><br />
            <Text>{selectedAppointment.service.name}</Text>
          </Modal>
          :
          null
      }

      <FlexlistWrapper>
        {appointments.map(({ appointment_to, id, service, customer, canceled_at, time_done_at }) => {
          const d = new Date(appointment_to);
          const [data,] = d.toLocaleString().split(' ');
          return (
            <div style={{
              width: '300px'
            }} key={id}>
              <Card
                onClick={() => handleSelectAppointment({ id })}
                hoverable
                title={<Title level={3}>{customer.name}</Title>}
                bordered={false}
                style={{
                  width: 300,
                  backgroundColor: canceled_at ? '#ff4d4f' : time_done_at ? '#bae637' : '#d6e4ff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                  <Text>R$ {service.value}</Text>
                </div>
                <Title level={5}>{data}</Title>
                <Text>{service.name}</Text>
              </Card>
            </div>
          );
        })}
      </FlexlistWrapper>
    </>
  );
}
