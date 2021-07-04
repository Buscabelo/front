import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import './Search.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Provider from '../../components/Service/Service'

function Service({ data }) {
  return (
    <div className="service-item">
      <p>{data.title}</p>
      <p>{data.description}</p>
    </div>
  )
}

export default function Search() {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSearch(location.state.search);
    } else {
      history.replace('/');
    }
  }, [location, history])

  return (
    <AppLayout>
      <Divider size={1} />
      <header className="search-header">
        <h2>Resultados para "{search}"</h2>
        {false && 'filtro'}
      </header>
      <Divider size={0.5} />
      <h3 className="search-title"><i>Serviços encontrados:</i></h3>
      <List
        direction="vertical"
        itemsPerLine={2}
        ItemComponent={Service}
        items={[{id: 1, title: 'Cabelo raspadinho, estilo ronaldinho', link: '', description: 'R$ 35,00'},{id: 3, title: 'Corte Brabo', link: '', description: 'R$ 60,00'}]}
      />
      <Divider size={0.5} />
      <h3 className="search-title"><i>Estabelecimentos encontrados:</i></h3>
      <List
        direction={isMobile ? 'vertical' : 'horizontal'}
        itemsPerLine={2}
        ItemComponent={Provider}
        items={[{id: 2, icon: 'https://picsum.photos/200/200', title: 'Dom Manuel', link: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', rating: '4,0'},{id: 5, icon: 'https://picsum.photos/200/200', title: 'Dom Manuel', link: '', description: 'Lorem Ipsum', rating: '4,0'},{id: 6, icon: 'https://picsum.photos/200/200', title: 'Dom Manuel', link: '', description: 'Lorem Ipsum', rating: '4,0'},{id: 7, icon: 'https://picsum.photos/200/200', title: 'Dom Manuel', link: '', description: 'Lorem Ipsum', rating: '4,0'}]}
      />
      <Divider size={1} />
    </AppLayout>
  )
}
