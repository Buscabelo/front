import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthRoutes from './modules/auth/router';
import CustomerRoutes from './modules/customer/router';
import ProviderRoutes from './modules/provider/router';

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
