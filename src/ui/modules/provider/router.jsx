import { Route } from 'react-router-dom';

import Appointments from './pages/Appointments';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';

export default function ProviderRoutes() {
  return (
    <>
      <Route exact path="/painel" component={Dashboard} />
      <Route exact path="/painel/servicos" component={Services} />
      <Route exact path="/painel/agendamentos" component={Appointments} />
    </>
  );
}
