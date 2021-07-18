import { useState } from 'react';

import './Appointment.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';

export default function Appointment() {
  const [rate, setRate] = useState(null);

  return (
    <AppLayout>
      <Divider size={1} />
      <article className="item-container">
        <header>
          <h1>Yan Cortes <span className="done">Finalizado</span></h1>
          <p>Data do Agendamento: 11/07/2021</p>
        </header>
        <main>
          <ol>
            <li>
              <h2>Corte Certo</h2>
              <p><b>Finalizado em:</b> 11/07/2021 - 15:40</p>
              <p>
                Avaliação: 
                {!rate ? <select onChange={({target}) => setRate(target.value)}>
                  <option value="1">1</option>
                  <option value="1">2</option>
                  <option value="1">3</option>
                  <option value="1">4</option>
                  <option value="1">5</option>
                </select>
                  :
                  rate
                }
              </p>
              <p>Valor: R$ 25,00</p>
            </li>
          </ol>
        </main>
      </article>
      <Divider size={1} />
    </AppLayout>
  );
}
