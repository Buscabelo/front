import { Route } from 'react-router-dom';

import AppointmentDetail from './pages/AppointmentDetail';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Provider from './pages/Provider';
import Providers from './pages/Providers';
import Search from './pages/Search';
import Service from './pages/Service';
import Services from './pages/Services';

export default [
  <Route key="servicos" exact path="/servicos" component={Services} />,
  <Route key="estabelecimentos" exact path="/estabelecimentos" component={Providers} />,
  <Route key="agendamentos" exact path="/agendamentos" component={Appointments} />,
  <Route key="agendamento" exact path="/agendamento/:id" component={AppointmentDetail} />,
  <Route key="estabelecimento" exact path="/estabelecimento/:id" component={Provider} />,
  <Route key="pesquisa" exact path="/pesquisa" component={Search} />,
  <Route key="servico" exact path="/servico/:id" component={Service} />,
  <Route key="perfil" exact path="/perfil" component={Profile} />,
];
