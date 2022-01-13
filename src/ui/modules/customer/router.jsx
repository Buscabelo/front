import { Route } from 'react-router-dom';

import Appointment from './pages/Appointment';
import Appointments from './pages/Appointments';
import Home from './pages/Home';
import Provider from './pages/Provider';
import Search from './pages/Search';
import Service from './pages/Service';

export default function CustomerRoutes() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/agendamentos" component={Appointments} />
      <Route exact path="/agendamento/:id" component={Appointment} />
      <Route exact path="/estabelecimento/:id" component={Provider} />
      <Route exact path="/pesquisa" component={Search} />
      <Route exact path="/servico/:id" component={Service} />
    </>
  );
}
