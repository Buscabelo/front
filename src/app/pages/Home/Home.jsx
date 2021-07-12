import { isMobile } from 'react-device-detect';

import AppLayout from '../../components/AppLayout/AppLayout';
import Carousel from '../../components/Carousel/Carousel';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';
import Service from '../../components/Service/Service';

export default function Home() {
  return (
    <AppLayout>
      <Divider size={1} />
      <Carousel />
      <Divider size={1} />
      <List
        direction={isMobile ? 'vertical' : 'horizontal'}
        itemsPerLine={3}
        ItemComponent={Service}
        items={[{id: 1, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', rating: '4,0'},{id: 2, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem Ipsum', rating: '4,0'},{id: 3, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem Ipsum', rating: '4,0'},{id: 4, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem Ipsum', rating: '4,0'}]}
      />
      <Divider size={1} />
    </AppLayout>
  )
}
