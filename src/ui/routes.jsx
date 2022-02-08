import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthRoutes from './modules/auth/router';
import CustomerRoutes from './modules/customer/router';
import ProviderRoutes from './modules/provider/router';
import { ResponseHandlerProvider } from './modules/provider/context/ResponseHandlerContext';
import AuthContextProvider from './modules/provider/context/AuthContext';

export default function Routes() {
  return (
    <Router>
      <Switch>
        {AuthRoutes}
        {CustomerRoutes}
        <ResponseHandlerProvider>
          <AuthContextProvider>
            {ProviderRoutes}
          </AuthContextProvider>
        </ResponseHandlerProvider>
      </Switch>
    </Router>
  );
}
