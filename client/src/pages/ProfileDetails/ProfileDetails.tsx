import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Paper, Typography, Box } from '@material-ui/core/';
import { Button, Rating } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, Fragment } from 'react';
import useStyles from './useStyles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { mockProfile } from '../../mocks/mockProfile';
import { useAuth } from './../../context/useAuthContext';
import Reviews from '../../components/Reviews/Reviews';
import { useSnackBar } from './../../context/useSnackbarContext';
import { createBooking } from '../../helpers/APICalls/bookingService';
import { profileGet } from '../../helpers/APICalls/profile';
import { Profile } from '../../interface/Profile';
import { Review } from '../../interface/Review';
import { getReviews } from '../../helpers/APICalls/reviews';

interface Params {
  id: string;
}
export default function ProfileDetails(): JSX.Element {
  const [dropInDate, setDropInDate] = useState<Date | null>(new Date());
  const [pickUpDate, setPickUpDate] = useState<Date | null>(new Date());
  const [processing, setProcessing] = useState(false);
  const [profileFromDb, setProfileFromDb] = useState<Profile>({});
  const [reviewList, setReviewList] = useState<Review[]>([]);

  const classes = useStyles();
  const { id: sitterProfileId }: Params = useParams();
  const { profileData: loggedInUserProfile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { reviews } = profileFromDb;

  useEffect(() => {
    profileGet({ id: sitterProfileId })
      .then((profile) => setProfileFromDb(profile))
      .catch(() => updateSnackBarMessage('An error occured while trying to process your request'));
    getReviews(sitterProfileId)
      .then((data) => setReviewList(data))
      .catch((error) => updateSnackBarMessage(error.message || 'An error occurred while processing your request'));
  }, [sitterProfileId, updateSnackBarMessage]);

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
    if (loggedInUserProfile && dropInDate && pickUpDate) {
      await createBooking({
        dropInDate: dropInDate.toString() as string,
        pickUpDate: pickUpDate.toString() as string,
        sitterProfileId,
        ownerProfileId: loggedInUserProfile._id as string,
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
    <Grid container justifyContent="center">
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src={coverPic} alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src={profilePic} alt="Profile Pic" />
          <Typography variant="h4">
            {profileFromDb?.firstName} {profileFromDb?.lastName}
          </Typography>
          <Typography variant="subtitle1">{profileFromDb?.introduction}</Typography>
          <Typography color="primary" variant="subtitle2">
            <LocationOnIcon fontSize="small" className={classes.locationIcon} /> {profileFromDb?.address}
          </Typography>
          <Box marginTop="1rem" display="flex" flexDirection="column" alignItems="center">
            {profileFromDb.reviews && (
              <Fragment>
                <Rating value={reviews?.aggregate} readOnly />
                <Typography variant="h5">Total reviews: {reviews?.totalReviews}</Typography>
              </Fragment>
            )}
          </Box>
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

      <Box className={classes.bookingAndReview}>
        {profileFromDb.isSitter && (
          <Box component={Paper} className={classes.bookingContainer}>
            <Typography variant="h5">$14/hr</Typography>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Drop in"
              value={dropInDate}
              onChange={(newValue) => {
                setDropInDate(newValue);
              }}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Pick up"
              value={pickUpDate}
              onChange={(newValue) => {
                setPickUpDate(newValue);
              }}
            />
            {processing ? (
              <CircularProgress />
            ) : (
              <ThemeProvider theme={theme}>
                <Button onClick={createRequest} variant="contained" color="primary" size="large">
                  Send Request
                </Button>
              </ThemeProvider>
            )}
          </Box>
        )}
        <Box className={classes.reviewContainer}>{reviewList.length > 0 && <Reviews reviews={reviewList} />}</Box>
      </Box>
    </Grid>
  );
}
