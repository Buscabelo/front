import { useContext } from 'react';
import { Route } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';
import ListServices from './pages/ListServices/ListServices';
import RegisterService from './pages/RegisterService/RegisterService';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthPage from './pages/AuthPage/AuthPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import ListAppointments from './pages/ListAppointments/ListAppointments';

import DashboardLayout from './components/DashboardLayout/DashboardLayout';

export default function DashboardRoutes() {
  const { isAuthenticated, isCheckingAuthentication } = useContext(AuthContext);

  if (isCheckingAuthentication)
    return <LoadingPage />;

  if (isAuthenticated)
    return (
      <DashboardLayout>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/service" component={ListServices} />
        <Route exact path="/dashboard/service/register" component={RegisterService} />
        <Route exact path="/dashboard/appointments" component={ListAppointments} />
      </DashboardLayout>
    );

  return <AuthPage />;
}
