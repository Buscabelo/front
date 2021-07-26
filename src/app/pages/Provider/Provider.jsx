import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { MdGridOn, MdFormatListBulleted } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';

import './Provider.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Provider() {
  const history = useHistory();
  const { id } = useParams();
  const [direction, setDirection] = useState('horizontal');
  const [data, setData] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    if (isMobile) {
      setDirection('vertical');
    }
  }, [])

  const loadProvider = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/${id}`)
      .then((response) => response.json())
      .then(({ provider }) => {
        setData(provider);
      })
      .catch((error) => {
        if (history.length > 1) {
          history.goBack();
        } else {
          history.replace('/');
        }
      })
  }, [id, setData])

  const loadServices = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/${id}/services`)
      .then((response) => response.json())
      .then((apiData) => {
        const servicos = apiData.map(a => a.service);
        setServices(servicos);
      })
  }, [id, setServices])

  useEffect(() => {
    loadProvider();
    loadServices();
  }, [loadProvider, loadServices])

  const handleDirectionChange = (changedDirection) => {
    if (direction !== changedDirection)
      setDirection(changedDirection);
  }

  if (!data) {
    return null;
  }

  return (
    <AppLayout>
      <div className="provider-banner">
        <img src="https://picsum.photos/1200/250" alt="Capa Estabelecimento" />
      </div>
      <Divider size={1} />
      <header className="provider-header">
        <aside>
          {data.avatar && <img src={data.avatar} alt={`Imagem do estabelecimento ${data.name}`} />}
        </aside>
        <main>
          <h2>{data.name}</h2>
          <p className="info">
            <span className="opened">Aberto</span>
            •
            <span className="">Fecha às 17:00</span>
          </p>
          {!isMobile && <p>{data.description}</p>}
        </main>
      </header>
      {isMobile && <p className="provider-description">{data.description}</p>}
      {services && <>
        <Divider size={1} />
        <div className="services-header">
          <h3 className="services-title">Serviços</h3>
          <div className="services-views">
            <MdGridOn className={`${direction === 'horizontal' ? 'active' : '' }`} onClick={() => handleDirectionChange('horizontal')} />
            <MdFormatListBulleted className={`${direction === 'vertical' ? 'active' : '' }`} onClick={() => handleDirectionChange('vertical')} />
          </div>
        </div>
        <Divider size={1} />
        <List
          direction={direction}
          itemsPerLine={2}
          ItemComponent={Service}
          items={services}
        />
      </>}
      <Divider size={1} />
    </AppLayout>
  )
}
