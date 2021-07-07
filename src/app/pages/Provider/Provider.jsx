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

  useEffect(() => {
    if (isMobile) {
      setDirection('vertical');
    }
  }, [])

  const loadProvider = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/${id}`)
      .then((response) => response.json())
      .then(({data}) => {
        setData(data);
      })
      .catch((error) => {
        if (history.length > 1) {
          history.goBack();
        } else {
          history.replace('/');
        }
      })
  }, [id, setData])

  useEffect(() => {
    loadProvider();
  }, [loadProvider])

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
        items={[{id: 2, icon: 'https://picsum.photos/200/200', title: 'Corte 01', link: '', description: 'R$ 30,00', rating: '4,0'},{id: 5, icon: 'https://picsum.photos/200/200', title: 'Corte 02', link: '', description: 'R$ 25,00', rating: '4,0'},{id: 6, icon: 'https://picsum.photos/200/200', title: 'Corte 03', link: '', description: 'R$ 16,50', rating: '4,0'},{id: 7, icon: 'https://picsum.photos/200/200', title: 'Corte 04', link: '', description: 'R$ 65,50', rating: '4,0'}]}
      />
      <Divider size={1} />
    </AppLayout>
  )
}
