import { Grid, Typography, Box, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import ProfileEditForm from './EditProfileForm/EditProfileForm';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
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
