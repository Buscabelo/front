import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { MdGridOn, MdFormatListBulleted } from 'react-icons/md';

import './Provider.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Provider() {
  const [direction, setDirection] = useState('horizontal');

  useEffect(() => {
    if (isMobile) {
      setDirection('vertical');
    }
  }, [])

  const handleDirectionChange = (changedDirection) => {
    if (direction !== changedDirection)
      setDirection(changedDirection)
  }

  return (
    <AppLayout>
      <div className="provider-banner">
        <img src="https://picsum.photos/1200/250" alt="Capa Estabelecimento" />
      </div>
      <Divider size={1} />
      <header className="provider-header">
        <aside>
          <img src="https://picsum.photos/200/250" alt="Avatar Estabelecimento" />
        </aside>
        <main>
          <h2>Barbearia Dom Manuel</h2>
          <p className="info">
            <span className="opened">Aberto</span>
            •
            <span className="">Fecha às 17:00</span>
          </p>
          {!isMobile && <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </p>}
        </main>
      </header>
      {isMobile && <p className="provider-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>}
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
        items={[{id: 2, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'R$ 30,00', rating: '4,0'},{id: 5, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'R$ 25,00', rating: '4,0'},{id: 6, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'R$ 16,50', rating: '4,0'},{id: 7, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'R$ 65,50', rating: '4,0'}]}
      />
      <Divider size={1} />
    </AppLayout>
  )
}
