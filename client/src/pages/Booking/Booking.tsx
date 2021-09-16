import { Box } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { getBookings } from '../../helpers/APICalls/bookingService';
import { BookingApiData } from '../../interface/BookingApiData';
import useStyles from './useStyles';

export default function Booking(): JSX.Element {
  const classes = useStyles();

  const [bookings, setBookings] = useState<BookingApiData | null>(null);

  useEffect(() => {
    getBookings().then((result) => {
      setBookings(result);
    });
  }, []);

  return (
    <Box component="main" className={classes.root}>
      bookings
    </Box>
  );
}
