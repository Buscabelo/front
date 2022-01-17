import { Route } from 'react-router-dom';

import Appointments from './pages/Appointments';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';

export default [
  <Route key="painel:home" exact path="/painel" component={Dashboard} />,
  <Route key="painel:servicos" exact path="/painel/servicos" component={Services} />,
  <Route key="painel:agendamentos" exact path="/painel/agendamentos" component={Appointments} />,
];
