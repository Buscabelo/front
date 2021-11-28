import { useContext, useEffect, useState } from 'react';
import { Card, Typography } from 'antd';

import { ResponseHandlerContext } from '../../context/ResponseHandlerContext';

const { Title } = Typography;

export default function ListServices() {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  const { query, responseMessage } = useContext(ResponseHandlerContext)


  useEffect(() => {

    (async () => {
      const {response, statusCode} = await query({ 
        link: `${process.env.REACT_APP_BACKEND_AD}/services`,
        method: "GET",
        auth: true,
      })
      responseMessage({statusCode})
      if(response?.success) {
        setServices(response.services)
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div style={{ maxWidth: "100vw" }}>
      {
        services.length > 0 ?
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: "50px 50px",
            padding: "0px 160px",
            margin: "auto 0px",
          }}>
            {services.map(service => (
              <div style={{
                width: "300px"
              }} key={service.id}>
                <Card title={<Title level={3} >{service.name}</Title>} bordered={false} style={{ width: 300 }}>
                  <div style={{ height: "300px", background: "#ccc" }}>
                  </div>
                  <Title level={5}>R$ {service.value}</Title>
                </Card>
              </div>
            ))}
          </div>
          :
          <div>No services</div>
      }
    </div>
  );
}
