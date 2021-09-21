import { CssBaseline, Grid, Typography, Box, Paper } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import useStyles from './useStyles';
import profileCreate from '../../helpers/APICalls/profile';
import ProfileEditForm from './EditProfileForm/EditProfileForm';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();

  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" justifyContent="center" className={classes.root}>
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box>
          <Box width="100%" p={3} alignSelf="center">
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Typography align="center" className={classes.welcome} component="h1" variant="h5">
                  Edit Profile
                </Typography>
              </Grid>
            </Grid>
            <ProfileEditForm />
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
