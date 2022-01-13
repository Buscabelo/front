import { Route } from 'react-router-dom';

import Appointments from './pages/ListAppointments/ListAppointments';
import Dashboard from './pages/Dashboard/Dashboard';
import Services from './pages/ListServices/ListServices';

export default function ProviderRoutes() {
  return (
    <>
      <Route exact path="/painel" component={Dashboard} />
      <Route exact path="/painel/servicos" component={Services} />
      <Route exact path="/painel/agendamentos" component={Appointments} />
    </>
  );
}