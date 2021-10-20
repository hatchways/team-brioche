import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { BookingApiData } from '../../../interface/BookingApiData';
import SelectBooking from '../SelectBooking/SelectBooking';
import BookingCard from '../BookingCard/BookingCard';
import useStyles from './useStyle';

interface Props {
  bookings: BookingApiData;
}

export default function BookingGroup(props: Props): JSX.Element {
  const classes = useStyles();
  const { bookings } = props;
  const { upcoming, current, past } = bookings;
  return (
    <Grid item className={classes.bookingGroupContainer} container justifyContent="center">
      <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
        <Grid item className={classes.upcoming} component={Paper} elevation={5}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" className={classes.label}>
              Your next booking:
            </Typography>
            <SelectBooking isUpcoming={true} id={upcoming?._id} />
          </Box>
          {bookings.upcoming ? (
            <BookingCard isUpcoming={true} booking={bookings.upcoming} />
          ) : (
            'No upcoming bookings Yet'
          )}
        </Grid>
        <Grid item className={classes.current} component={Paper} elevation={5}>
          <Box className={classes.currentAndPast}>
            <Typography variant="h6" className={classes.label}>
              Current booking:
            </Typography>
            {current.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
            <Typography variant="h6" className={classes.label}>
              Past booking:
            </Typography>
            {past.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
