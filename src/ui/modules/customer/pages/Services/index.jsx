import { useCallback, useEffect, useState } from 'react';

import './Services.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Services() {
  const [data, setData] = useState([]);

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
    <AppLayout>
      <h1 className='title'>Serviços</h1>
      <List
        direction={'horizontal'}
        itemsPerLine={3}
        ItemComponent={Service}
        items={data}
      />
    </AppLayout>
  );
}