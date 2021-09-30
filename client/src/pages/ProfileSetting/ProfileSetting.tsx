import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import getProfile from '../../helpers/APICalls/getProfile';
import { useSnackBar } from '../../context/useSnackbarContext';
import { ProfileResponse } from '../../interface/ProfileResponse';

export default function ProfileSetting(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [profile, setProfile] = useState<ProfileResponse>({});

  const { loggedInUser } = useAuth();

  const history = useHistory();

  useEffect(() => {
    getProfile().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setProfile(data.success.profile);
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, [updateSnackBarMessage]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <Grid item className={classes.content} xs={12}>
        <ProfilePhoto loggedInUser={loggedInUser} profile={profile} setProfile={setProfile} />
      </Grid>
    </Grid>
  );
}
