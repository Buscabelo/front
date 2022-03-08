import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthRoutes from './modules/auth/router';
import CustomerRoutes from './modules/customer/router';
import ProviderRoutes from './modules/provider/router';

import AppContextProvider from './modules/common/context/AppContext';
import { ResponseHandlerProvider } from './modules/provider/context/ResponseHandlerContext';
import AuthContextProvider from './modules/provider/context/AuthContext';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <AppContextProvider>
          {AuthRoutes}
          {CustomerRoutes}
          <ResponseHandlerProvider>
            <AuthContextProvider>
              {ProviderRoutes}
            </AuthContextProvider>
          </ResponseHandlerProvider>
        </AppContextProvider>
      </Switch>
    </Router>
  );
}
