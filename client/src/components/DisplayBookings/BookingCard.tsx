import { BookingRequest } from '../../interface/BookingApiData';
import { Box, Typography } from '@material-ui/core';

interface Props {
  booking: BookingRequest | undefined | null;
}

export default function BookingCard(props: Props): JSX.Element {
  return (
    <>
      <Box>
        {props.booking ? (
          <Typography>
            Start date: {props.booking.start.toDateString()} {props.booking.start.getHours()}:
            {props.booking.start.getMinutes()}
          </Typography>
        ) : (
          'No upcoming booking'
        )}
      </Box>
    </>
  );
}
