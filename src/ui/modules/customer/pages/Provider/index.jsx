import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { MdGridOn, MdFormatListBulleted } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';
import { minStackLength } from '../../../../constants';

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
  }, []);

  const loadProvider = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/${id}`)
      .then(response => response.json())
      .then(({ success, provider }) => {
        if (success) {
          setData(provider);
        }
      })
      .catch(() => {
        if (history.length >= minStackLength) {
          history.goBack();
        } else {
          history.replace('/');
        }
      });
  }, [id, setData, history]);

  const loadServices = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/${id}/services`)
      .then(response => response.json())
      .then(({ success, services }) => {
        if (success) {
          setServices(services);
        }
      });
  }, [id, setServices]);

  useEffect(() => {
    loadProvider();
    loadServices();
  }, [loadProvider, loadServices]);

  const handleDirectionChange = changedDirection => {
    if (direction !== changedDirection)
      setDirection(changedDirection);
  };

  if (!data) {
    return null;
  }

  if (isMobile || isTablet) {
    return null;
  }

  return (
    <Layout>
      <div className="banner">
        <img src="https://picsum.photos/1200/250" alt="Capa Estabelecimento" />
      </div>
      <header className="header">
        {/* {data.avatar && <img src={data.avatar} alt={`Imagem do estabelecimento ${data.name}`} />} */}
        <img src="https://picsum.photos/100/100" alt="icone estabeleciemnto" />
        <main>
          <h2>{data.name}{data.rating && <p> - {data.rating}</p>}</h2>
          <a
            href='#'
            // onClick={() => setOpenAbout(!openAbout)}
            className='btn-link'>Ver mais</a>
        </main>
      </header>
      {services && <>
        <div className="services-header">
          <h3 className="services-title">Serviços</h3>
          <div className="services-views">
            <MdGridOn className={`${direction === 'horizontal' ? 'active' : '' }`} onClick={() => handleDirectionChange('horizontal')} />
            <MdFormatListBulleted className={`${direction === 'vertical' ? 'active' : '' }`} onClick={() => handleDirectionChange('vertical')} />
          </div>
        </div>
        <div className='service-main'>
          <List
            direction={direction}
            itemsPerLine={2}
            ItemComponent={Service}
            items={services}
          />
        </div>
      </>}
    </Layout>
  );
}
