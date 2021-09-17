import { Box, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { getBookings } from '../../helpers/APICalls/bookingService';
import { BookingApiData } from '../../interface/BookingApiData';
import Calendar from 'react-calendar';
import useStyles from './useStyles';
import 'react-calendar/dist/Calendar.css';
import BookingGroup from '../../components/DisplayBookings/BookingGroup';

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
      <Grid container wrap="wrap" className={classes.main} direction="row-reverse">
        <Grid item className={classes.calendar}>
          <Calendar value={date} onChange={setDate} />
        </Grid>
        <Grid item className={classes.bookings}>
          <BookingGroup bookings={bookings} />
        </Grid>
      </Grid>
    </Box>
  );
}
