import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Login from './pages/Accounts/Login/Login';
import Signup from './pages/Accounts/Signup/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import HomePage from './pages/HomePage/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProfileListings from './components/ProfileListings/ProfileListings/ProfileListing';
import Layout from './Layout/DashboardLayout';
import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Layout>
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/booking" component={Booking} />
                    <Route exact path="/profile/:id?" component={Profile} />
                    <Route path="/profile-listings" component={ProfileListings} />
                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/edit-profilel" component={EditProfile} />
                    <Route path="*" render={() => <Redirect to="/login" />} />
                  </Switch>
                </Layout>
              </LocalizationProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
