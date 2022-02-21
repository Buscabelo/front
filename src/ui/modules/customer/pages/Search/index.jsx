import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory, useLocation } from 'react-router-dom';
import { MdSearch, MdFilterList, MdChevronRight } from 'react-icons/md';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Provider from '../../components/Provider/Provider';
import FilterModal from '../../components/FilterModal';
import ProviderModal from '../../components/ProviderModal';
import { decimalPlaces } from '../../../../constants';

function Service({ data }) {
  return (
    <div className="service-item">
      <p><a href={`/servico/${data.id}`}>{data.name}</a></p>
      <p>R$ {data.value.toFixed(decimalPlaces).replace('.', ',')}</p>
    </div>
  );
}

const initialIndex = 0;
const timeoutDebounce = 1000;

export default function Search() {
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [tab, setTab] = useState(initialIndex);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    if (location.state) {
      setSearch(location.state.search);
    } else if (!isMobile && !isTablet) {
      history.replace('/');
    }
  }, [location, history]);

  const loadServices = useCallback(async () => {
    try {
      const body = new URLSearchParams();

      if (search) {
        body.append('name', search);
      }

      if (minPrice) {
        body.append('minPrice', minPrice);
      }

      if (maxPrice) {
        body.append('maxPrice', maxPrice);
      }

      if (serviceType) {
        body.append('serviceType', serviceType);
      }

      if (body.toString()) {
        const response = await fetch(`${process.env.REACT_APP_API}/services/search?${body.toString()}`);
        const { success, services } = await response.json();

        if (success) {
          setServices(services);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setServices([]);
    }
  }, [search, setServices, minPrice, maxPrice, serviceType]);

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
      const t = setTimeout(() => {
        if (isMobile || isTablet) {
          if (tab === initialIndex)
            loadServices();
          else
            loadProviders();
        } else {
          loadServices();
          loadProviders();
        }
      }, timeoutDebounce);

      return () => clearTimeout(t);
    }
  }, [search, tab, loadServices, loadProviders]);

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
  useEffect(() => {
    setSearch('');
    setMinPrice(null);
    setMaxPrice(null);
    setServiceType(null);
    setServices([]);
    setProviders([]);
  }, [tab]);

  useEffect(() => {
    if (minPrice || maxPrice || serviceType) {
      loadServices();
    }
  }, [minPrice, maxPrice, serviceType, loadServices]);

  if (isMobile || isTablet) {
    const renderServices = () => {
      if (services.length) {
        return (
          <ul className="services">
            {services.map(service => (
              <li key={service.id} onClick={() => setSelectedProvider(service.provider.id)}>
                <img src="https://picsum.photos/70/70" />
                <main>
                  <b>{service.name}</b>
                  R$ {service.value.toFixed(decimalPlaces).replace('.', ',')}
                </main>
                <aside onClick={() => null}>
                  <MdChevronRight />
                </aside>
              </li>
            ))}
          </ul>
        );
      }

      return <p>Você ainda não pesquisou nada ou o que pesquisou não foi encontrado</p>;
    };

    const renderProviders = () => {
      if (providers.length) {
        return (
          <ul className="providers">
            {providers.map(provider => (
              <li key={provider.id} onClick={() => setSelectedProvider(provider.id)}>
                <img src={provider.avatar || 'https://picsum.photos/270/165'} />
                <header>
                  <h3>{provider.name}</h3>
                  {provider.rating && <span>{provider.rating.replace('.', ',')} <FaStar /></span>}
                </header>
                {provider.description && <main>
                  {provider.description}
                </main>}
                {provider.address && <footer>
                  <FaMapMarkerAlt />
                  <address>{provider.address}</address>
                </footer>}
              </li>
            ))}
          </ul>
        );
      }

      return <p>Você ainda não pesquisou nada ou o que pesquisou não foi encontrado</p>;
    };

    return (
      <Layout>
        <article className="search-wrapper">
          <header>
            <fieldset>
              <span>
                <MdSearch />
              </span>
              <input type="text" value={search} onChange={({ target }) => setSearch(target.value)} placeholder="Insira sua pesquisa" />
              {tab === initialIndex && <button type="button" onClick={() => setShowFilter(true)}>
                <MdFilterList />
              </button>}
            </fieldset>
          </header>
          <main>
            <Tabs selectedIndex={tab} onSelect={index => setTab(index)}>
              <TabList>
                <Tab>Serviços</Tab>
                <Tab>Estabelecimentos</Tab>
              </TabList>
              <TabPanel>
                {renderServices()}
              </TabPanel>
              <TabPanel>
                {renderProviders()}
              </TabPanel>
            </Tabs>
          </main>
        </article>
        <FilterModal
          show={showFilter}
          onHide={() => setShowFilter(false)}
          changeMinPrice={setMinPrice}
          changeMaxPrice={setMaxPrice}
          changeServiceType={setServiceType}
        />
        <ProviderModal
          show={selectedProvider !== null}
          providerId={selectedProvider}
          onHide={() => setSelectedProvider(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Divider size={1} />
      <header className="search-header">
        <h2>Resultados para &quot;{search}&quot;</h2>
        {false && 'filtro'}
      </header>
      <Divider size={0.5} />
      {renderContent()}
    </Layout>
  );
}
