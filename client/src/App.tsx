import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Accounts/Login/Login';
import Signup from './pages/Accounts/Signup/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import Booking from './pages/Booking/Booking';
import ProfileSkeleton from './components/ProfileSettingsSkeleton/ProfileSettingsSkeleton';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Profile from './pages/ProfileSetting/ProfileSetting';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './Layout/DashboardLayout';
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
              <Layout>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/booking" component={Booking} />
                  <Route exact path="/profile" component={Profile} />
                  <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                  <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
                  <ProtectedRoute exact path="/profiles/:id" component={ProfileDetails} />
                  <Route path="*" render={() => <Redirect to="/login" />} />
                </Switch>
              </Layout>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
