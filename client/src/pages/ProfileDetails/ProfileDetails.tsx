import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core/';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useStyles from './useStyles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { mockProfile } from '../../mocks/mockProfile';
import { useAuth } from './../../context/useAuthContext';
import { useSnackBar } from './../../context/useSnackbarContext';
import { createBooking } from '../../helpers/APICalls/bookingService';

interface Params {
  id: string;
}
export default function ProfileDetails(): JSX.Element {
  const [dropInDate, setDropInDate] = useState<Date | null>(new Date());
  const [pickUpDate, setPickUpDate] = useState<Date | null>(new Date());
  const [processing, setProcessing] = useState(false);

  const classes = useStyles();
  const params: Params = useParams();
  const { profileData } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const { description, galleryPics, profilePic, coverPic } = mockProfile;

  const theme = createTheme({
    palette: {
      primary: { main: '#f04040' },
      secondary: { main: '#8c8c8c' },
    },
  });

  const createRequest = async () => {
    if (!dropInDate || !pickUpDate) return;
    const start = new Date(dropInDate?.toString() as string).getTime();
    const end = new Date(pickUpDate?.toString() as string).getTime();

    if (start > end) {
      updateSnackBarMessage('Pick up time must be ahead of drop in time');
      return;
    }
    if (!dropInDate?.toString() || !pickUpDate?.toString()) {
      updateSnackBarMessage('Please select a time slot');
      return;
    }
    setProcessing(true);
    if (profileData && dropInDate && pickUpDate) {
      await createBooking({
        dropInDate: dropInDate.toString() as string,
        pickUpDate: pickUpDate.toString() as string,
        sitterProfileId: params.id,
        ownerProfileId: profileData._id as string,
      })
        .then(() => {
          updateSnackBarMessage('Reqeust created successfully');
          setProcessing(false);
        })
        .catch((err) => {
          updateSnackBarMessage(err.message || 'An error occured and the request could not be completed');
          setProcessing(false);
        });
    } else updateSnackBarMessage('Please update your profile before you can send a request');
  };

  return (
    <Grid container>
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src={coverPic} alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src={profilePic} alt="Profile Pic" />
          <Typography variant="h4">
            {profileData?.firstName} {profileData?.lastName}
          </Typography>
          <Typography variant="subtitle1">{profileData?.introduction}</Typography>

          <Typography color="primary" variant="subtitle2">
            <LocationOnIcon fontSize="small" className={classes.locationIcon} /> {profileData?.address}
          </Typography>
        </Grid>
        <Grid container className={classes.aboutContainer}>
          <Typography variant="h5">About me</Typography>
          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>
          <Grid container className={classes.galleryContainer}>
            {galleryPics?.map((url) => (
              <img key={url} src={url} className={classes.galleryPic} alt="Galley Pics" />
            ))}
          </Grid>
        </Grid>
      </Paper>
      <Paper component="form" className={classes.bookingContainer}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container className={classes.requestContainer}>
            <Typography variant="h5">$14/hr</Typography>
            <Grid container direction="column" className={classes.dateContainer}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Drop in"
                value={dropInDate}
                onChange={(newValue) => {
                  setDropInDate(newValue);
                }}
              />
            </Grid>
            <Grid container direction="column" className={classes.dateContainer}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Pick up"
                value={pickUpDate}
                onChange={(newValue) => {
                  setPickUpDate(newValue);
                }}
              />
            </Grid>
            <ThemeProvider theme={theme}>
              {processing ? (
                <CircularProgress />
              ) : (
                <Button onClick={createRequest} variant="contained" color="primary" size="large">
                  Send Request
                </Button>
              )}
            </ThemeProvider>
          </Grid>
        </LocalizationProvider>
      </Paper>
    </Grid>
  );
}
