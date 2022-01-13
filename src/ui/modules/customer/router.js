import { Route } from 'react-router-dom';

import Appointment from './pages/Appointment/Appointment';
import Appointments from './pages/Appointments/Appointments';
import Home from './pages/Home/Home';
import Provider from './pages/Provider/Provider';
import Search from './pages/Search/Search';
import Service from './pages/Service/Service';

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