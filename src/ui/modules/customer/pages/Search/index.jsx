import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory, useLocation } from 'react-router-dom';

import './styles.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Provider from '../../components/Service/Service';
import { decimalPlaces } from '../../../../constants';

function Service({ data }) {
  return (
    <div className="service-item">
      <p><a href={`/servico/${data.id}`}>{data.name}</a></p>
      <p>R$ {data.value.toFixed(decimalPlaces).replace('.', ',')}</p>
    </div>
  );
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
  }, [location, history]);

  const loadServices = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/services/search?name=${search}`)
      .then(response => response.json())
      .then(({ success, services }) => {
        if (success) {
          setServices(services);
        }
      })
      .catch(() => {
        setServices([]);
      });
  }, [search, setServices]);

  const loadProviders = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers/search?name=${search}`)
      .then(response => response.json())
      .then(({ success, providers }) => {
        if (success) {
          setProviders(providers);
        }
      })
      .catch(() => {
        setProviders([]);
      });
  }, [search, setProviders]);

  useEffect(() => {
    if (search) {
      loadServices();
      loadProviders();
    }
  }, [search, loadServices, loadProviders]);

  const renderContent = () => {
    if ((!providers || providers && !providers.length) && (!services || services && !services.length)) {
      return <>Não foram encontrados serviços ou estabelecimentos com o(s) termo(s) pesquisado(s)</>;
    }

    return (
      <>
        {services && services.length && <>
          <h3 className="search-title"><i>Serviços encontrados:</i></h3>
          <List
            direction="vertical"
            itemsPerLine={2}
            ItemComponent={Service}
            items={services}
          />
          <Divider size={0.5} />
        </>}
        {providers && providers.length && <>
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
  };

  if (isMobile || isTablet) {
    return <></>;
  }

  return (
    <AppLayout>
      <Divider size={1} />
      <header className="search-header">
        <h2>Resultados para &quot;{search}&quot;</h2>
        {false && 'filtro'}
      </header>
      <Divider size={0.5} />
      {renderContent()}
    </AppLayout>
  );
}
