import { Grid, Paper, Typography } from '@material-ui/core/';
import { Rating, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useStyles from './useStyles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { mockProfile } from '../../mocks/mockProfile';
export default function Profile(): JSX.Element {
  const classes = useStyles();
  const [dropInValue, setDropInValue] = useState<Date | null>(new Date());
  const [dropOffValue, setDropOffValue] = useState<Date | null>(new Date());
  const { firstName, lastName, introduction, address, description, galleryPics, profilePic, coverPic } = mockProfile;
  const theme = createTheme({
    palette: {
      primary: { main: '#f04040' },
      secondary: { main: '#8c8c8c' },
    },
  });
  return (
    <Grid container>
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src={coverPic} alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src={profilePic} alt="Profile Pic" />
          <Typography variant="h4">
            {firstName} {lastName}
          </Typography>
          <Typography variant="subtitle1">{introduction}</Typography>

          <Typography color="primary" variant="subtitle2">
            <LocationOnIcon fontSize="small" className={classes.locationIcon} /> {address}
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
              <Button onClick={() => console.log()} variant="contained" color="primary" size="large">
                Send Request
              </Button>
            </ThemeProvider>
          </Grid>
        </LocalizationProvider>
      </Paper>
    </Grid>
  );
}
