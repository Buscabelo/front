import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory, useLocation } from 'react-router-dom';
import { MdSearch, MdFilterList, MdChevronRight } from 'react-icons/md';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './styles.css';
import Layout from '../../../common/components/CustomerLayout';
import List from '../../components/List/List';
import Provider from '../../components/Provider/Provider';
import FilterModal from '../../components/FilterModal';
import ProviderModal from '../../components/ProviderModal';
import ServiceDesktop from '../../components/Service/Service';
import { decimalPlaces } from '../../../../constants';
import backgroundSearchingFile from '../../../../assets/images/undraw/file_searching.svg';

// function Service({ data }) {
//   return (
//     <div className="service-item">
//       <p><a href={`/servico/${data.id}`}>{data.name}</a></p>
//       <p>R$ {data.value.toFixed(decimalPlaces).replace('.', ',')}</p>
//     </div>
//   );
// }

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

  useEffect(() => {
    if (isMobile || isTablet) {
      setSearch('');
      setMinPrice(null);
      setMaxPrice(null);
      setServiceType(null);
      setServices([]);
      setProviders([]);
    }
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
                  {provider.rating && <span>{provider.rating} <FaStar /></span>}
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
      <header className="search-results">
        <h2>Resultados para <p>{search}</p></h2>
      </header>
      <div className='content'>
        <Tabs selectedIndex={tab} onSelect={index => setTab(index)}>
          <TabList>
            <Tab>Estabelecimentos ({providers.length})</Tab>
            <Tab>Serviços ({services.length})</Tab>
          </TabList>
          <TabPanel>
            {providers.length ?
              <List
                direction={'horizontal'}
                itemsPerLine={3}
                ItemComponent={Provider}
                items={providers}
              />
              :
              <div className='noappointments'>
                <h2 className='subtitle'>O que pesquisou não foi encontrado, pesquise novamente</h2>
                <img src={backgroundSearchingFile} className='image-fundo' alt="backgroundFundo" />
              </div>
            }
          </TabPanel>
          <TabPanel>
            {services.length ?
              <List
                direction={'horizontal'}
                itemsPerLine={2}
                ItemComponent={ServiceDesktop}
                items={services}
              />
              :
              <div className='noappointments'>
                <h2 className='subtitle'>O que pesquisou não foi encontrado, pesquise novamente</h2>
                <img src={backgroundSearchingFile} className='image-fundo' alt="backgroundFundo" />
              </div>
            }
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}
