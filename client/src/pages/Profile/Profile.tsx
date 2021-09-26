import { Grid, Paper, Typography, Button } from '@material-ui/core/';
import { useState } from 'react';
import useStyles from './useStyles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
export default function Profile(): JSX.Element {
  const classes = useStyles();
  const [dropInValue, setDropInValue] = useState<Date | null>(new Date());
  const [dropOffValue, setDropOffValue] = useState<Date | null>(new Date());
  return (
    <Grid container>
      <Paper className={classes.profileContainer}>
        <img className={classes.coverImage} src="/pics/cover-sample.jpg" alt="Cover Photo" />
        <Grid container className={classes.basicInfoContainer} direction="column" alignItems="center">
          <img className={classes.profilePic} src="/pics/profilepic-sample.jpg" alt="Profile Pic" />
          <Typography variant="h4">Norma Byers</Typography>
          <Typography variant="subtitle1">Loving Pet Sitter</Typography>

          <Typography variant="subtitle2">
            <LocationOnIcon fontSize="small" className={classes.locationIcon} /> Toronto,ON
          </Typography>
        </Grid>
        <Grid container className={classes.aboutContainer}>
          <Typography variant="h5">About me</Typography>
          <Typography variant="body1" className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
            repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
            fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur
            iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
            sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo
            neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi
            expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.
          </Typography>
          <Grid container className={classes.galleryContainer}>
            <img className={classes.galleryPic} src="/pics/dog1.jpg" alt="Gallery Pics" />
            <img className={classes.galleryPic} src="/pics/dog2.jpg" alt="Gallery Pics" />
            <img className={classes.galleryPic} src="/pics/dog3.jpg" alt="Gallery Pics" />
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
