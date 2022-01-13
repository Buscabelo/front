import { useContext } from 'react';
import { Route } from 'react-router-dom';

import { AuthContext } from './modules/provider/context/AuthContext';
import ListServices from './modules/provider/pages/ListServices/ListServices';
import RegisterService from './modules/provider/pages/RegisterService/RegisterService';
import Dashboard from './modules/provider/pages/Dashboard/Dashboard';
import AuthPage from './modules/auth/pages/AuthPage/AuthPage';
import LoadingPage from './modules/provider/pages/LoadingPage/LoadingPage';
import ListAppointments from './modules/provider/pages/ListAppointments/ListAppointments';

import DashboardLayout from './modules/provider/components/DashboardLayout/DashboardLayout';

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
