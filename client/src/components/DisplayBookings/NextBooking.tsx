import { Box, Typography } from '@material-ui/core';
import { BookingRequest } from '../../interface/BookingApiData';
import BookingCard from './BookingCard';

interface Props {
  booking: BookingRequest | null | undefined;
}

export default function NextBooking(props: Props): JSX.Element {
  return (
    <Box>
      <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
        YOUR NEXT BOOKING:
      </Typography>
      {props.booking ? <BookingCard nextBooking={true} booking={props.booking} /> : 'No upcoming bookings Yet'}
    </Box>
  );
}
