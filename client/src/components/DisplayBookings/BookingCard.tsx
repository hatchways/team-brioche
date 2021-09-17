import { BookingRequest } from '../../interface/BookingApiData';
import { Box, Typography } from '@material-ui/core';

interface Props {
  booking: BookingRequest;
}

export default function BookingCard(props: Props): JSX.Element {
  const {
    booking: { start },
  } = props;

  return (
    <>
      <Box>
        <Typography>
          Start date: {start.toDateString()} {start.getHours()}:{start.getMinutes()}
        </Typography>
      </Box>
    </>
  );
}
