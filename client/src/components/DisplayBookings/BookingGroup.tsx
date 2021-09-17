import { Grid, Typography } from '@material-ui/core';
import { BookingApiData } from '../../interface/BookingApiData';
import useStyles from '../../pages/Booking/useStyles';
import BookingCardList from './BookingCardList';
import NextBooking from './NextBooking';
interface Props {
  bookings: BookingApiData;
}

export default function BookingGroup(props: Props): JSX.Element {
  const classes = useStyles();
  const { bookings } = props;
  return (
    <Grid container direction="column" style={{ justifyContent: 'space-evenly' }}>
      <Grid item className={classes.upcoming}>
        <NextBooking booking={bookings.upcoming} />
      </Grid>
      <Grid item className={classes.current}>
        <Typography variant="h4">CURRENT BOOKING:</Typography>
        <BookingCardList bookingList={bookings.current} />

        <Typography>PAST BOOKING:</Typography>
        <BookingCardList bookingList={bookings.past} />
      </Grid>
    </Grid>
  );
}
