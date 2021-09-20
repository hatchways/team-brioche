import { Box, Typography } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import BookingCard from '../BookingCard/BookingCard';
import SelectBooking from '../SelectBooking/SelectBooking';
import useStyles from './useStyle';

interface Props {
  booking: BookingRequest | null | undefined;
}

export default function NextBooking(props: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.upcomingHeading}>
        <Typography variant="h6">YOUR NEXT BOOKING:</Typography>
        <SelectBooking id={props.booking?._id} />
      </Box>
      {props.booking ? <BookingCard isUpcoming={true} booking={props.booking} /> : 'No upcoming bookings Yet'}
    </Box>
  );
}
