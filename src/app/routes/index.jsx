import { BrowserRouter as Router, Switch } from 'react-router-dom';

import CustomerRoutes from './customer';
import ProviderRoutes from './provider';
import AuthRoutes from './auth';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <CustomerRoutes />
        <ProviderRoutes />
        <AuthRoutes />
      </Switch>
    </Router>
  );
}
