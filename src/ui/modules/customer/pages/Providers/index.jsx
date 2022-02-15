import { useCallback, useEffect, useState } from 'react';

import './Providers.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Providers() {
  const [data, setData] = useState([]);

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
    <AppLayout>
      <h1 className='title'>Estabelecimentos</h1>
      <List
        direction={'horizontal'}
        itemsPerLine={3}
        ItemComponent={Service}
        items={data}
      />
    </AppLayout>
  );
}