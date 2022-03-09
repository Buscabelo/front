import { useCallback, useContext, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { FaStar } from 'react-icons/fa';

import './Home.css';

import Layout from '../../../common/components/CustomerLayout';
import Carousel from '../../components/Carousel/Carousel';
import SearchInput from '../../components/SearchInput/SearchInput';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';
import { getCategoryIcon } from '../../../common/utils/index';
import { AppContext } from '../../../common/context/AppContext';

export default function Home() {
  const { categories, user } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(true);
  const [providers, setProviders] = useState([]);

  const loadProviders = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers`)
      .then(response => response.json())
      .then(({ success, providers }) => {
        if (success) {
          setProviders(providers);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [setProviders]);

  const loadTopProviders = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/top`);
      const { success, providers } = await response.json();

      if (success) {
        setProviders(providers);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [setProviders]);

  useEffect(() => {
    if (isMobile || isTablet) {
      loadTopProviders();
    } else {
      loadProviders();
    }
  }, [loadProviders, loadTopProviders]);

  if (isMobile || isTablet) {
    return (
      <Layout>
        <article className="home-wrapper">
          <Carousel />
          <section className="service-types">
            <h2>Serviços</h2>
            <ol>
              {categories.map(category => <li key={category}>
                <a href="#">
                  {getCategoryIcon(category)}
                  <h3>{category}</h3>
                </a>
              </li>)}
            </ol>
          </section>
          {!!providers.length && <section className="best-providers">
            <h2>Estabelecimentos do Momento</h2>
            <ol>
              {providers.map(provider => <li key={provider.id}>
                <img src={provider.avatar || 'https://picsum.photos/270/165'} />
                <main>
                  <h3>{provider.name}</h3>
                  {provider.rating_number && <span>{provider.rating_number} <FaStar /></span>}
                </main>
              </li>)}
            </ol>
          </section>}
        </article>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='searchInputHome'>
        {!user && <SearchInput
          isShow={showSearch}
          hide={() => setShowSearch(false)}
        />}
      </div>
      <div className='listActiveOption'>
        <List
          direction={isMobile ? 'vertical' : 'horizontal'}
          itemsPerLine={3}
          ItemComponent={Service}
          items={providers}
        />
      </div>
    </Layout>
  );
}
