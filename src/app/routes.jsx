import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Appointments from './pages/Appointments/Appointments';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Provider from './pages/Provider/Provider';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import Service from './pages/Service/Service';

export default function Routes() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/agendamentos" component={Appointments} />
        <Route exact path="/cadastrar" component={Register} />
        <Route exact path="/estabelecimento/:id" component={Provider} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pesquisa" component={Search} />
        <Route exact path="/servico/:id" component={Service} />
      </Switch>
    </Router>
  );
}
