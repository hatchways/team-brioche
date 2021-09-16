import { Box, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { BookingCard } from '../../components/DisplayBookings/BookingCard';
import { getBookings } from '../../helpers/APICalls/bookingService';
import { BookingApiData } from '../../interface/BookingApiData';
import useStyles from './useStyles';

export default function Booking(): JSX.Element {
  const classes = useStyles();

  const [bookings, setBookings] = useState<BookingApiData>({
    upcoming: [],
    current: [],
    past: [],
  });

  useEffect(() => {
    getBookings().then((result) => {
      setBookings(result);
    });
  }, []);

  return (
    <Box component="main" className={classes.root}>
      <Grid container>
        <Grid item>
          <BookingCard current={bookings.current} />
        </Grid>
      </Grid>
    </Box>
  );
}
