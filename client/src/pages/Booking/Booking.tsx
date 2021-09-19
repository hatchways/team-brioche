import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useState, FunctionComponent } from 'react';
import Calendar from 'react-calendar';
import useStyles from './useStyles';
import 'react-calendar/dist/Calendar.css';
import BookingGroup from '../../components/DisplayBookings/BookingGroup';
import { useRequest, withReqeust } from '../../context/useRequestContext';
import CalendarView from '../../components/DisplayBookings/CalendarView';

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
      <Box style={{ paddingTop: '3rem' }}>
        <Grid container wrap="wrap" direction="row-reverse" justify="center">
          <CalendarView date={date} setDate={setDate} />
          <BookingGroup bookings={bookings} />
        </Grid>
      </Box>
    </Box>
  );
};

export default withReqeust(Booking);
