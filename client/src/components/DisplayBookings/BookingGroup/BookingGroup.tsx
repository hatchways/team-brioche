import { Grid, Paper, Box } from '@material-ui/core';
import { BookingApiData } from '../../../interface/BookingApiData';
import NextBooking from '../NextBooking/NextBooking';
import CurrentAndPast from '../CurrentAndPast/CurrentAndPast';
import useStyles from './useStyle';

interface Props {
  bookings: BookingApiData;
}

export default function BookingGroup(props: Props): JSX.Element {
  const classes = useStyles();
  const { bookings } = props;
  return (
    <Grid item xl={5} lg={6} md={7} sm={8} xs={12} container justify="center">
      <Box className={classes.bookingGroupContainer}>
        <Grid container direction="column" className={classes.bookingGroup}>
          <Grid xl={8} lg={8} md={8} sm={10} xs={10} component={Paper} elevation={5} item className={classes.upcoming}>
            <NextBooking booking={bookings.upcoming} />
          </Grid>
          <Grid xl={8} lg={8} md={8} sm={10} xs={10} component={Paper} elevation={5} item className={classes.current}>
            <CurrentAndPast />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
