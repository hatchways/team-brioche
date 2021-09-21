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
    <Grid item lg={4} md={5} sm={6} xs={11} container justify="center">
      <Box className={classes.bookingGroupContainer}>
        <Grid container direction="column" justify="space-evenly" alignItems="center">
          <Grid component={Paper} elevation={5} item className={classes.upcoming}>
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" className={classes.label}>
                  YOUR NEXT BOOKING:
                </Typography>
                <SelectBooking isUpcoming={true} id={upcoming?._id} />
              </Box>
              {bookings.upcoming ? (
                <BookingCard isUpcoming={true} booking={bookings.upcoming} />
              ) : (
                'No upcoming bookings Yet'
              )}
            </Box>
          </Grid>
          <Grid component={Paper} elevation={5} item className={classes.current}>
            <Box className={classes.currentAndPast}>
              <Typography variant="h6" className={classes.label}>
                CURRENT BOOKING:
              </Typography>
              {current.map((booking, index) => (
                <BookingCard key={index} booking={booking} />
              ))}
              <Typography variant="h6" className={classes.label}>
                PAST BOOKING:
              </Typography>
              {past.map((booking, index) => (
                <BookingCard key={index} booking={booking} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
