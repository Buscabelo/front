import { Route } from 'react-router-dom';

import Appointment from './pages/Appointment';
import Appointments from './pages/Appointments';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Provider from './pages/Provider';
import Search from './pages/Search';
import Service from './pages/Service';

export default [
  <Route key="inicio" exact path="/" component={Home} />,
  <Route key="agendamentos" exact path="/agendamentos" component={Appointments} />,
  <Route key="agendamento" exact path="/agendamento/:id" component={Appointment} />,
  <Route key="estabelecimento" exact path="/estabelecimento/:id" component={Provider} />,
  <Route key="pesquisa" exact path="/pesquisa" component={Search} />,
  <Route key="servico" exact path="/servico/:id" component={Service} />,
  <Route key="perfil" exact path="/perfil" component={Profile} />,
];
