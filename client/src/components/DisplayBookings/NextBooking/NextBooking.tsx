import { Box } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import BookingCard from '../BookingCard/BookingCard';
import SelectBooking from '../SelectBooking/SelectBooking';
import Label from '../Label/Label';
import useStyles from './useStyle';

interface Props {
  booking: BookingRequest | null | undefined;
}

export default function NextBooking(props: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.upcomingHeading}>
        <Label type="heading">YOUR NEXT BOOKING:</Label>
        <SelectBooking _id={props.booking?._id} />
      </Box>
      {props.booking ? <BookingCard nextBooking={true} booking={props.booking} /> : 'No upcoming bookings Yet'}
    </Box>
  );
}
