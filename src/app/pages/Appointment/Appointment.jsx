import './Appointment.css';
import AppLayout from '../../components/AppLayout/AppLayout';
import Divider from '../../components/Divider/Divider';

export default function Appointment() {
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
              <p>Valor: R$ 25,00</p>
            </li>
          </ol>
        </main>
      </article>
      <Divider size={1} />
    </AppLayout>
  );
}
