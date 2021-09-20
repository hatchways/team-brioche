import { Grid, Typography, Paper, Box } from '@material-ui/core';
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
    <Grid item xl={5} lg={6} md={6} sm={6} xs={12} container justify="center">
      <Box style={{ width: '100%' }}>
        <Grid container direction="column" className={classes.bookingGroup}>
          <Grid xl={8} lg={8} md={8} sm={10} xs={10} component={Paper} elevation={5} item className={classes.upcoming}>
            <NextBooking booking={bookings.upcoming} />
          </Grid>
          <Grid xl={8} lg={8} md={8} sm={10} xs={10} component={Paper} elevation={5} item className={classes.current}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
              CURRENT BOOKING:
            </Typography>
            <BookingCardList bookingList={bookings.current} />

            <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
              PAST BOOKING:
            </Typography>
            <BookingCardList bookingList={bookings.past} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
