import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { BookingApiData } from '../../../interface/BookingApiData';
import NextBooking from '../NextBooking/NextBooking';
import useStyles from './useStyle';
import BookingCardList from '../BookingCardList/BookingCardList';

interface Props {
  bookings: BookingApiData;
}

export default function BookingGroup(props: Props): JSX.Element {
  const classes = useStyles();
  const { bookings } = props;
  return (
    <Grid item lg={4} md={5} sm={7} xs={11} container justify="center">
      <Box className={classes.bookingGroupContainer}>
        <Grid container direction="column" className={classes.bookingGroup}>
          <Grid component={Paper} elevation={5} item className={classes.upcoming}>
            <NextBooking booking={bookings.upcoming} />
          </Grid>
          <Grid component={Paper} elevation={5} item className={classes.current}>
            <Box className={classes.currentAndPast}>
              <Typography variant="h6" className={classes.label}>
                CURRENT BOOKING:
              </Typography>
              <BookingCardList bookingList={bookings.current} />
              <Typography variant="h6" className={classes.label}>
                PAST BOOKING:
              </Typography>
              <BookingCardList bookingList={bookings.past} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
