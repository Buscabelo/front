import { Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

export default [
  <Route key="cadastro" exact path="/cadastro" component={Register} />,
  <Route key="acesso" exact path="/acesso" component={Login} />,
];
