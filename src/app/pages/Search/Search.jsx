import { useCallback, useEffect, useState } from 'react';
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
      <p><a href={`/servico/${data.id}`}>{data.name}</a></p>
      <p>R$ {data.value.toFixed(2).replace('.', ',')}</p>
    </div>
  )
}

export default function Search() {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (location.state) {
      setSearch(location.state.search);
    } else {
      history.replace('/');
    }
  }, [location, history])

  const loadServices = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/services/search?name=${search}`)
      .then((response) => response.json())
      .then(({data}) => {
        setServices(data)
      })
      .catch((error) => { setServices([]) })
  }, [search, setServices])

  const loadProviders = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/search?name=${search}`)
      .then((response) => response.json())
      .then(({data}) => {
        setProviders(data)
      })
      .catch((error) => { setProviders([]) })
  }, [search, setProviders])

  useEffect(() => {
    if (search) {
      loadServices();
      loadProviders();
    }
  }, [search, loadServices, loadProviders])

  const renderContent = () => {
    if ((!providers || (providers && providers.length === 0)) && (!services || (services && services.length === 0))) {
      return <>Não foram encontrados serviços ou estabelecimentos com o(s) termo(s) pesquisado(s)</> 
    }

    return (
      <>
        {services && services.length > 0 && <>
          <h3 className="search-title"><i>Serviços encontrados:</i></h3>
          <List
            direction="vertical"
            itemsPerLine={2}
            ItemComponent={Service}
            items={services}
          />
          <Divider size={0.5} />
        </>}
        {providers && providers.length > 0 && <>
          <h3 className="search-title"><i>Estabelecimentos encontrados:</i></h3>
          <List
            direction={isMobile ? 'vertical' : 'horizontal'}
            itemsPerLine={2}
            ItemComponent={Provider}
            items={providers}
          />
          <Divider size={1} />
        </>}
      </>
    );
  }

  return (
    <AppLayout>
      <Divider size={1} />
      <header className="search-header">
        <h2>Resultados para "{search}"</h2>
        {false && 'filtro'}
      </header>
      <Divider size={0.5} />
      {renderContent()}
    </AppLayout>
  )
}
