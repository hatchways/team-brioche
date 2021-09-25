import { FunctionComponent } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useRequest, withRequest } from '../../context/useRequestContext';
import CalendarView from '../../components/DisplayBookings/CalendarView/CalendarView';
import BookingGroup from '../../components/DisplayBookings/BookingGroup/BookingGroup';
import useStyles from './useStyles';

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
      <Grid container wrap="wrap" direction="row-reverse" justify="space-around">
        <CalendarView />
        <BookingGroup bookings={bookings} />
      </Grid>
    </Box>
  );
};

export default withRequest(Booking);
