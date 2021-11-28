import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Appointment from './pages/Appointment/Appointment';
import Appointments from './pages/Appointments/Appointments';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Provider from './pages/Provider/Provider';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import Service from './pages/Service/Service';

// Provider
import ListServices from './pages/ListServices/ListServices';
import RegisterService from './pages/RegisterService/RegisterService';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthPage from './pages/AuthPage/AuthPage';

import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import { ResponseHandlerProvider } from './context/ResponseHandlerContext';
import AuthContext from "./context/AuthContextProvider";
import LoadingPage from './pages/LoadingPage/LoadingPage';
import ListAppointments from './pages/ListAppointments/ListAppointments';

export default function Routes() {
  const { isAuthenticated, isCheckingAuthentication } = useContext(AuthContext)

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

        <ResponseHandlerProvider>
          <Route exact path="/sessions" component={AuthPage} />
          {isCheckingAuthentication ?
            <LoadingPage />
          :
            isAuthenticated ?
              <DashboardLayout>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/service" component={ListServices} />
                <Route exact path="/dashboard/service/register" component={RegisterService} />
                <Route exact path="/appointments" component={ListAppointments} />
              </DashboardLayout>
            :
              <AuthPage />              
          }
        </ResponseHandlerProvider>
      </Switch>
    </Router>
  );
}
