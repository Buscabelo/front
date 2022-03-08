import { useCallback, useContext, useEffect, useState } from 'react';

import './Providers.css';
import Layout from '../../../common/components/CustomerLayout';
import List from '../../components/List/List';
import Provider from '../../components/Provider/Provider';
import SearchInput from '../../components/SearchInput/SearchInput';
import { AppContext } from '../../../common/context/AppContext';

export default function Providers() {
  const [data, setData] = useState([]);
  const { user } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(true);

  const loadProviders = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/providers`, {
    })
      .then(response => response.json())
      .then(({ success, providers }) => {
        if (success) setData(providers);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  }, [setData]);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);
  return (
    <Layout>
      <div className='searchInputHome'>
        {!user && <SearchInput
          isShow={showSearch}
          hide={() => setShowSearch(false)}
        />}
      </div>
      <h1 className='title'>Estabelecimentos</h1>
      <List
        direction={'horizontal'}
        itemsPerLine={3}
        ItemComponent={Provider}
        items={data}
      />
    </Layout>
  );
}