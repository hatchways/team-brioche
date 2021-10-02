import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Accounts/Login/Login';
import Signup from './pages/Accounts/Signup/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
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
          {/* <AuthProvider> */}
          <SocketProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Switch>
                <Route path="/profile-listings">
                  <Layout component={<ProfileListings />} />
                </Route>
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
                <ProtectedRoute exact path="/dashboard">
                  <Layout component={<Dashboard />} />
                </ProtectedRoute>
                <ProtectedRoute exact path="/edit-profile">
                  <Layout component={<EditProfile />} />
                </ProtectedRoute>
                <ProtectedRoute exact path="/profiles/:id">
                  <Profile />
                </ProtectedRoute>
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </LocalizationProvider>
          </SocketProvider>
          {/* </AuthProvider> */}
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
