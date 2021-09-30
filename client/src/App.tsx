import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/Accounts/Login/Login';
import Signup from './pages/Accounts/Signup/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import Booking from './pages/Booking/Booking';
import ProfileSkeleton from './components/ProfileSettingsSkeleton/ProfileSettingsSkeleton';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
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
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/booking" component={Booking} />
                <ProtectedRoute exact path="/dashboard">
                  <Dashboard />
                </ProtectedRoute>
                <Route exact path="/profile/:id">
                  <Profile />
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
