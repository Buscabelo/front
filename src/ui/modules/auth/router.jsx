import { Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

export default function AuthRoutes() {
  return (
    <>
      <Route exact path="/cadastro" component={Register} />
      <Route exact path="/acesso" component={Login} />
    </>
  );
}
