import { useCallback, useEffect, useState } from 'react';

import './Services.css';
import Layout from '../../../common/components/CustomerLayout';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';
import SearchInput from '../../components/SearchInput/SearchInput';

export default function Services() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('@buscabelo_client/user'));
  const [showSearch, setShowSearch] = useState(true);

  const loadServices = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/services`, {
    })
      .then(response => response.json())
      .then(({ success, services }) => {
        if (success) setData(services);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  }, [setData]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);
  return (
    <Layout>
      <div className='searchInputHome'>
        {!user && <SearchInput
          isShow={showSearch}
          hide={() => setShowSearch(false)}
        />}
      </div>
      <h1 className='title'>Serviços</h1>
      <List
        direction={'horizontal'}
        itemsPerLine={3}
        ItemComponent={Service}
        items={data}
      />
    </Layout>
  );
}