import { Box, Typography, Container, Grid } from '@material-ui/core';
import { BookingRequest } from '../../interface/BookingApiData';
import BookingCard from './BookingCard';
import SelectBooking from './SelectBooking';

interface Props {
  booking: BookingRequest | null | undefined;
}

export default function NextBooking(props: Props): JSX.Element {
  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
          YOUR NEXT BOOKING:
        </Typography>
        <SelectBooking _id={props.booking?._id} />
      </Box>
      {props.booking ? <BookingCard nextBooking={true} booking={props.booking} /> : 'No upcoming bookings Yet'}
    </Box>
  );
}
