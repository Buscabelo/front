import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory, useParams } from 'react-router';

import './Service.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';
import List from '../../components/List/List';

function ServiceItem({ data }) {
  return (
    <a href="/" className="wrapper">
      <aside>
        <img src={data.icon} />
      </aside>
      <main>
        <p>{data.description}</p>
      </main>
    </a>
  )
}

export default function Service() {
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState(null);

  const loadService = useCallback(() => {
    fetch(`${process.env.REACT_APP_API}/services/${id}`)
      .then((response) => response.json())
      .then(({data}) => {
        setData(data)
      })
      .catch((error) => {
        if (history.length > 1) {
          history.goBack();
        } else {
          history.replace('/');
        }
      })
  }, [id, setData]);

  useEffect(() => {
    loadService();
  }, [loadService])

  if (!data) {
    return null;
  }

  return (
    <AppLayout>
      <Divider size={1} />
      <article className="service-wrapper">
        <main>
          <h2>{data.name}</h2>
          <p>R$ {data.value.toFixed(2).replace('.', ',')}</p>
          <p><b>Estabelecimento:</b> Barbearia Dom Manuel</p>
          <section>
            <b>Descrição:</b>
            <p>{data.description}</p>
          </section>
          <section className="btn-group">
            <button onClick={() => {}}>Marcar Horário</button>
            <button onClick={() => {}}>Favoritar</button>
          </section>
        </main>
        <aside>
          Carrossel
        </aside>
      </article>
      <Divider size={1} />
      <section className="other-services">
        <h3>Outros serviços de Barbearia Dom Manuel</h3>
        <Divider size={1} />
        <List
          direction={isMobile ? 'vertical' : 'horizontal'}
          itemsPerLine={2}
          ItemComponent={ServiceItem}
          items={[{id: 2, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', rating: '4,0'},{id: 5, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem Ipsum', rating: '4,0'},{id: 6, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem Ipsum', rating: '4,0'},{id: 7, icon: 'https://picsum.photos/200/200', title: 'Corte Brabo', link: '', description: 'Lorem Ipsum', rating: '4,0'}]}
        />
      </section>
      <Divider size={1} />
    </AppLayout>
  )
}
