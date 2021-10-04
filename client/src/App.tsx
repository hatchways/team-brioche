import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './Layout/DashboardLayout';
import Login from './pages/Accounts/Login/Login';
import Signup from './pages/Accounts/Signup/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './App.css';
import ProfileSetting from './pages/ProfileSetting/ProfileSetting';
function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Switch>
                <Route exact path="/login">
                  <Layout component={<Login />} />
                </Route>
                <Route exact path="/signup">
                  <Layout component={<Signup />} />
                </Route>
                <Route exact path="/booking">
                  <Layout component={<Booking />} />
                </Route>
                <ProtectedRoute exact path="/dashboard">
                  <Layout component={<Dashboard />} />
                </ProtectedRoute>
                <ProtectedRoute exact path="/edit-profile">
                  <Layout component={<EditProfile />} />
                </ProtectedRoute>
                <Route exact path="/profile">
                  <Layout component={<ProfileSetting />} />
                </Route>
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
