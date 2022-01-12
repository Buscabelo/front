import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import AppLayout from '../../components/AppLayout/AppLayout';
import Carousel from '../../components/Carousel/Carousel';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Home() {
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

  return (
    <AppLayout>
      <Divider size={1} />
      <Carousel />
      <Divider size={1} />
      <List
        direction={isMobile ? 'vertical' : 'horizontal'}
        itemsPerLine={3}
        ItemComponent={Service}
        items={providers}
      />
      <Divider size={1} />
    </AppLayout>
  );
}
