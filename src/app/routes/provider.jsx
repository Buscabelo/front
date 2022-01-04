import { Route } from 'react-router-dom';

import Layout from '../layouts/Provider';

import Appointments from '../pages/ListAppointments/ListAppointments';
import Dashboard from '../pages/Dashboard/Dashboard';
import Services from '../pages/ListServices/ListServices';

export default function Provider() {
  return (
    <Layout>
      <Route exact path="/painel" component={Dashboard} />
      <Route exact path="/painel/servicos" component={Services} />
      <Route exact path="/painel/agendamentos" component={Appointments} />
    </Layout>
  );
}
