import { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { getList } from '../../../helpers/APICalls/profileListService';
import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

export default function ProfileListing(): JSX.Element {
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();

  useEffect(() => {
    getList()
      .then((res) => {
        setProfileList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        updateSnackBarMessage('An error occured while fetching your request please try again');
      });
    return;
  }, [updateSnackBarMessage]);

  if (isLoading)
    return (
      <Grid container justify="center" direction="column" className={classes.loading}>
        <Typography variant="h5" align="center">
          Getting the List of Dog sitters...
        </Typography>
        <Grid item container justify="space-around">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className={classes.Skeleton} />
          ))}
        </Grid>
      </Grid>
    );
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography align="center" variant="h2" component="h1" className={classes.bolder}>
          Your search Results
        </Typography>
      </Grid>
      <Grid item container justify="space-around">
        {!profileList.length ? (
          <Typography variant="h4">No Results to display</Typography>
        ) : (
          profileList.map((profile) => <ProfileCard key={profile._id} profile={profile} />)
        )}
      </Grid>
    </Grid>
  );
}
