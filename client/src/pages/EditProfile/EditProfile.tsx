import { CssBaseline, Grid, Typography, Box, Paper } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
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
  const { initSocket } = useSocket();

  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    initSocket();
  }, [initSocket]);
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }
  const handleSubmit = (
    {
      firstName,
      lastName,
      gender,
      phone,
      address,
      description,
    }: {
      firstName: string;
      lastName: string;
      gender: string;
      phone: number;
      address: string;
      description: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      firstName: string;
      lastName: string;
      gender: string;
      phone: number;
      address: string;
      description: string;
    }>,
  ) => {
    profileCreate(firstName, lastName, gender, phone, address, description).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        console.log('profile created');
        setSubmitting(false);
        updateSnackBarMessage('Profile Created');
      } else {
        console.log({ data });
        setSubmitting(false);
      }
    });
  };

  return (
    <Grid container component="main" justifyContent="center" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box className="">
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className="" component="h1" variant="h5">
                  Edit Profile
                </Typography>
              </Grid>
            </Grid>
            <ProfileEditForm handleSubmit={handleSubmit} />
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
