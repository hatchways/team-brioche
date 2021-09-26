import { Grid, Paper, Typography, Button } from '@material-ui/core/';
import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { profileGet } from '../../helpers/APICalls/profile';
interface ProfileParams {
  id: string;
}
interface ProfileI {
  firstName: string;
  lastName: string;
  profilePic?: string;
  galleryPics?: string[];
  gender: string;
  description: string;
  introduction?: string;
  pitch?: string;
  rate?: number;
  error?: string;
}
export default function Profile(): JSX.Element {
  const classes = useStyles();
  const { id } = useParams<ProfileParams>();
  const initialData = {
    firstName: '',
    lastName: '',
    city: '',
    description: '',
    gender: 'male',
  };
  const [profile, setProfile] = useState<ProfileI | null | undefined>(initialData);
  const [dropInValue, setDropInValue] = useState<Date | null>(new Date());
  const [dropOffValue, setDropOffValue] = useState<Date | null>(new Date());
  useEffect(() => {
    profileGet({ id }).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else if (data) {
        setProfile(data);
      }
    });
  }, [id]);
  return (
    <Grid container>
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src="/pics/cover-sample.jpg" alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src={profile?.profilePic} alt="Profile Pic" />
          <Typography variant="h4">
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography variant="subtitle1">{profile?.introduction}</Typography>
          <Typography color="primary" variant="subtitle2">
            <LocationOnIcon fontSize="small" className={classes.locationIcon} /> Toronto,ON
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
      <Paper className={classes.bookingContainer}>
        <Grid container className={classes.requestContainer}>
          <Typography variant="h5">$14/hr</Typography>
          <Grid container className={classes.dateContainer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Drop In"
                value={dropInValue}
                onChange={(newValue) => {
                  setDropInValue(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container className={classes.dateContainer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Drop Off"
                value={dropOffValue}
                onChange={(newValue) => {
                  setDropOffValue(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Button color="primary">Send Request</Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
