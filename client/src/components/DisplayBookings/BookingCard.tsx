import { BookingRequest } from '../../interface/BookingApiData';
import { Box, Typography } from '@material-ui/core';
import { displayDateTime } from './../../helpers/datTimeHelper';
import useStyles from '../../pages/Booking/useStyles';

interface Props {
  booking: BookingRequest;
}

export default function BookingCard(props: Props): JSX.Element {
  const classes = useStyles();
  const { start, end, dogOwner } = props.booking;
  const { username } = dogOwner;
  return (
    <Box className={classes.bookingCard}>
      <Typography>{displayDateTime(start, end)}</Typography>
      <Typography>{username}</Typography>
    </Box>
  );
}
