import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { FaInstagram, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

import './Home.css';

import Carousel from '../../components/Carousel/Carousel';
import FloatMenu from '../../../common/components/FloatMenu';

import AppLayout from '../../components/AppLayout/AppLayout';
import SearchInput from '../../components/Header/SearchInput';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
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

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  if (isMobile || isTablet) {
    return (
      <>
        <article className="home-wrapper">
          <Carousel />
          <section className="service-types">
            <h2>Serviços</h2>
            <ol>
              <li>
                <a href="#">
                  <FaInstagram />
                  <h3>Corte</h3>
                </a>
              </li>

              <li>
                <a href="#">
                  <FaInstagram />
                  <h3>Corte</h3>
                </a>
              </li>

              <li>
                <a href="#">
                  <FaInstagram />
                  <h3>Corte</h3>
                </a>
              </li>

              <li>
                <a href="#">
                  <FaInstagram />
                  <h3>Corte</h3>
                </a>
              </li>

              <li>
                <a href="#">
                  <FaInstagram />
                  <h3>Corte</h3>
                </a>
              </li>
            </ol>
          </section>
          <section className="best-providers">
            <h2>Estabelecimentos do Momento</h2>
            <ol>
              <li>
                <img src="https://picsum.photos/270/165" />
                <main>
                  <h3>Dom Manuel</h3>
                  <span>4,3 <FaStar /></span>
                </main>
                <footer>
                  <FaMapMarkerAlt />
                  <address>Avenida Senador Salgado Filho, 1559, Tirol...</address>
                </footer>
              </li>
              <li>
                <img src="https://picsum.photos/270/165" />
                <main>
                  <h3>Dom Manuel</h3>
                  <span>4,3 <FaStar /></span>
                </main>
                <footer>
                  <FaMapMarkerAlt />
                  <address>Avenida Senador Salgado Filho, 1559, Tirol...</address>
                </footer>
              </li>
            </ol>
          </section>
        </article>
        <FloatMenu />
      </>
    );
  }

  return (
    <AppLayout>
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
    </AppLayout>
  );
}
