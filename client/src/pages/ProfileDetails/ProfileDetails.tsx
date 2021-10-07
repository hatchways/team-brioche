import { Grid, Paper, Typography } from '@material-ui/core/';
import { Rating, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import useStyles from './useStyles';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { profileGet } from '../../helpers/APICalls/profile';
import { Profile } from '../../interface/Profile';
import { useSnackBar } from '../../context/useSnackbarContext';
interface ProfileParams {
  id: string;
}
export default function ProfileDetails(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const { id } = useParams<ProfileParams>();
  const initialData: Profile = {
    firstName: '',
    lastName: '',
    address: '',
    description: '',
    gender: 'male',
  };
  const [profile, setProfile] = useState<Profile | null | undefined>(initialData);
  const [dropInValue, setDropInValue] = useState<Date | null>(new Date());
  const [dropOffValue, setDropOffValue] = useState<Date | null>(new Date());
  useEffect(() => {
    profileGet({ id }).then((data) => {
      if (data.error) {
        updateSnackBarMessage('Something went wrong');
      } else if (data) {
        setProfile(data);
      }
    });
  }, [id, updateSnackBarMessage]);
  const theme = createTheme({
    palette: {
      primary: { main: '#f04040' },
      secondary: { main: '#8c8c8c' },
    },
  });
  return (
    <Grid container>
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src={profile?.coverPic} alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src={profile?.profilePic} alt="Profile Pic" />
          <Typography variant="h4">
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography variant="subtitle1">{profile?.introduction}</Typography>
          <Typography color="primary" variant="subtitle2">
            <LocationOnIcon fontSize="small" className={classes.locationIcon} /> {profile?.address}
          </Typography>
        </Grid>
        <Grid container className={classes.aboutContainer}>
          <Typography variant="h5">About me</Typography>
          <Typography variant="body1" className={classes.description}>
            {profile?.description}
          </Typography>
          <Grid container className={classes.galleryContainer}>
            {profile?.galleryPics?.map((url) => (
              <img key={url} src={url} className={classes.galleryPic} alt="Galley Pics" />
            ))}
          </Grid>
        </Grid>
      </Paper>
      <Paper component="form" className={classes.bookingContainer}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container direction="column" className={classes.requestContainer}>
            <Typography variant="h5">$ {profile?.rate}</Typography>
            <Rating name="read-only" value={4} readOnly />
            <Grid container direction="column" className={classes.dateContainer}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Drop In"
                value={dropInValue}
                onChange={(newValue) => {
                  setDropInValue(newValue);
                }}
              />
            </Grid>
            <Grid container direction="column" className={classes.dateContainer}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Drop Off"
                value={dropOffValue}
                onChange={(newValue) => {
                  setDropOffValue(newValue);
                }}
              />
            </Grid>
            <ThemeProvider theme={theme}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Send Request
              </Button>
            </ThemeProvider>
          </Grid>
        </LocalizationProvider>
      </Paper>
    </Grid>
  );
}
