import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

export default function Routes() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cadastrar" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}
