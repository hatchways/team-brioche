import { Box, Grid, Typography } from '@material-ui/core';
import { useState, FunctionComponent } from 'react';
import Calendar from 'react-calendar';
import useStyles from './useStyles';
import 'react-calendar/dist/Calendar.css';
import BookingGroup from '../../components/DisplayBookings/BookingGroup';
import { useRequest, withReqeust } from '../../context/useRequestContext';

const Booking: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const { bookings, fetching } = useRequest();

  const [date, setDate] = useState<Date>(new Date());

  if (fetching)
    return (
      <Typography variant="h5" align="center">
        Loading...
      </Typography>
    );
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
};

export default withReqeust(Booking);
