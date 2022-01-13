import { Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

export default function AuthRoutes() {
  return (
    <>
      <Route exact path="/cadastro" component={Register} />
      <Route exact path="/acesso" component={Login} />
    </>
  );
}