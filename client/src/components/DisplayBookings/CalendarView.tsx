//import { useMemo } from 'react';
import Calendar from 'react-calendar';
import { Box, Grid, Paper } from '@material-ui/core';
//import { useRequest } from '../../context/useRequestContext';

export default function CalendarView(): JSX.Element {
  // const { bookings } = useRequest();

  // const dates = useMemo(() => {
  //   const allBookings = [...bookings.current, ...bookings.past, bookings.upcoming];
  //   return allBookings.map((booking) => new Date(booking?.start as string));
  // }, [bookings]);

  return (
    <Grid item xl={5} lg={6} md={6} sm={10} xs={12} container justify="center">
      <Box style={{ paddingBottom: '3rem' }}>
        <Paper elevation={5}>
          <Calendar value={new Date()} showFixedNumberOfWeeks={false} />
        </Paper>
      </Box>
    </Grid>
  );
}
