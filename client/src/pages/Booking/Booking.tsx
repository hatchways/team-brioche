import { Box, Grid, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import BookingCardList from '../../components/DisplayBookings/BookingCardList';
import BookingCard from '../../components/DisplayBookings/BookingCard';
import { getBookings } from '../../helpers/APICalls/MockBookingService';
import { BookingApiData } from '../../interface/BookingApiData';
import Calendar from 'react-calendar';
import useStyles from './useStyles';
import 'react-calendar/dist/Calendar.css';

export default function Booking(): JSX.Element {
  const classes = useStyles();

  const [bookings, setBookings] = useState<BookingApiData>({
    upcoming: null,
    current: [],
    past: [],
  });

  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    getBookings().then((result) => {
      setBookings(result);
    });
  }, []);
  console.log(date.toString());
  return (
    <Box component="main" className={classes.root}>
      <Grid
        container
        wrap="wrap"
        style={{ justifyContent: 'space-around', paddingTop: '2rem', paddingLeft: '4rem', paddingRight: '4rem' }}
        direction="row-reverse"
      >
        <Grid item>
          <Calendar value={date} onChange={setDate} />
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Box style={{ backgroundColor: 'white' }}>
                <Typography>YOUR NEXT BOOKING:</Typography>
                <BookingCard booking={bookings.upcoming} />
              </Box>
            </Grid>
            <Grid item>
              <Typography>CURRENT BOOKING:</Typography>
              <BookingCardList bookingList={bookings.current} />
              <Typography>PAST BOOKING:</Typography>
              <BookingCardList bookingList={bookings.past} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
