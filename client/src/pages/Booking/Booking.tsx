import { Box, Grid, Typography } from '@material-ui/core';
import { FunctionComponent } from 'react';
import useStyles from './useStyles';
import 'react-calendar/dist/Calendar.css';
import BookingGroup from '../../components/DisplayBookings/BookingGroup/BookingGroup';
import { useRequest, withReqeust } from '../../context/useRequestContext';
import CalendarView from '../../components/DisplayBookings/CalendarView/CalendarView';

const Booking: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const { bookings, fetching } = useRequest();

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
          <CalendarView />
          <BookingGroup bookings={bookings} />
        </Grid>
      </Box>
    </Box>
  );
};

export default withReqeust(Booking);
