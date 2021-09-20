import { Box, Typography } from '@material-ui/core';

interface Props {
  accepted: boolean;
  declined: boolean;
  nextBooking: boolean | undefined;
}

export default function BookingLabel({ accepted, declined }: Props): JSX.Element {
  return (
    <Box style={{ paddingRight: '0.5rem' }}>
      {accepted && !declined && <Typography>Accepted</Typography>}
      {declined && <Typography>Declined</Typography>}
    </Box>
  );
}
