import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';

export default function Routes() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pesquisa" component={Search} />
        <Route exact path="/cadastrar" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}
