import { FunctionComponent } from 'react';
import { Box, Grid } from '@material-ui/core';
import { CircularProgress } from '@mui/material';
import { useRequest, withRequest } from '../../context/useRequestContext';
import CalendarView from '../../components/DisplayBookings/CalendarView/CalendarView';
import BookingGroup from '../../components/DisplayBookings/BookingGroup/BookingGroup';
import useStyles from './useStyles';

const Booking: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const { bookings, fetching } = useRequest();

  if (fetching)
    return (
      <Grid container justifyContent="center" alignItems="center" className={classes.circularProgress}>
        <CircularProgress size="10rem" color="error" />
      </Grid>
    );
  return (
    <Box component="main" className={classes.root}>
      <Grid container wrap="wrap" direction="row-reverse" justifyContent="space-around">
        <CalendarView />
        <BookingGroup bookings={bookings} />
      </Grid>
    </Box>
  );
};

export default withRequest(Booking);
