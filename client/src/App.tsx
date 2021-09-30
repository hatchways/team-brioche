import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './Layout/DashboardLayout';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Login from './pages/Accounts/Login/Login';
import Signup from './pages/Accounts/Signup/SignUp';
import Profile from './pages/ProfileSetting/ProfileSetting';

import './App.css';

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
                <Route exact path="/profile">
                  <Layout component={<Profile />} />
                </Route>
                <Route exact path="/dashboard">
                  <Layout component={<Dashboard />} />
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
