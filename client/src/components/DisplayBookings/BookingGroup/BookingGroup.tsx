import { Grid, Paper, Box } from '@material-ui/core';
import { BookingApiData } from '../../../interface/BookingApiData';
import NextBooking from '../NextBooking/NextBooking';
import CurrentAndPast from '../CurrentAndPast/CurrentAndPast';
import useStyles from './useStyle';

interface Props {
  bookings: BookingApiData;
}

export default function BookingGroup(props: Props): JSX.Element {
  const classes = useStyles();
  const { bookings } = props;
  return (
    <Grid item lg={3} md={4} sm={6} xs={11} container justify="center">
      <Box className={classes.bookingGroupContainer}>
        <Grid container direction="column" className={classes.bookingGroup}>
          <Grid component={Paper} elevation={5} item className={classes.upcoming}>
            <NextBooking booking={bookings.upcoming} />
          </Grid>
          <Grid component={Paper} elevation={5} item className={classes.current}>
            <CurrentAndPast />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
