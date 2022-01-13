import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// auth
import Login from './modules/auth/pages/Login/Login';
import AuthPage from './modules/auth/pages/AuthPage/AuthPage';

//customer
import Appointment from './modules/customer/pages/Appointment/Appointment';
import Appointments from './modules/customer/pages/Appointments/Appointments';
import Home from './modules/customer/pages/Home/Home';
import Provider from './modules/customer/pages/Provider/Provider';
import Register from './modules/customer/pages/Register/Register';
import Search from './modules/customer/pages/Search/Search';
import Service from './modules/customer/pages/Service/Service';

// Provider
import { ResponseHandlerProvider } from './modules/provider/context/ResponseHandlerContext';
import AuthContextProvider from './modules/provider/context/AuthContext';
import DashboardRoutes from './dashboardRoutes';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/agendamentos" component={Appointments} />
        <Route exact path="/agendamento/:id" component={Appointment} />
        <Route exact path="/cadastrar" component={Register} />
        <Route exact path="/estabelecimento/:id" component={Provider} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pesquisa" component={Search} />
        <Route exact path="/servico/:id" component={Service} />

        <AuthContextProvider>
          <ResponseHandlerProvider>
            <Route exact path="/sessions" component={AuthPage} />
            <DashboardRoutes />
          </ResponseHandlerProvider>
        </AuthContextProvider>
      </Switch>
    </Router>
  );
}
