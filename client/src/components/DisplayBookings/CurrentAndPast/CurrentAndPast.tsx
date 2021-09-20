import { Box } from '@material-ui/core';
import { useRequest } from '../../../context/useRequestContext';
import BookingCardList from '../BookingCardList/BookingCardList';
import Label from '../Label/Label';
import useStyles from './useStyle';

export default function CurrentAndPast(): JSX.Element {
  const classes = useStyles();
  const { bookings } = useRequest();
  return (
    <Box className={classes.currentAndPast}>
      <Label type="heading">CURRENT BOOKING:</Label>
      <BookingCardList bookingList={bookings.current} />
      <Label type="heading">PAST BOOKING:</Label>
      <BookingCardList bookingList={bookings.past} />
    </Box>
  );
}
