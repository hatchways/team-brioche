import { Box, Grid } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import { displayDateTime } from '../../../helpers/dateTimeHelper';
import CardImage from '../CardImage/CardImage';
import SelectBooking from '../SelectBooking/SelectBooking';
import BookingLabel from '../BookingLabel/BookingLabel';
import Label from '../Label/Label';
import useStyles from './useStyle';
import clsx from 'clsx';

interface Props {
  booking: BookingRequest;
  nextBooking?: boolean;
}

export default function BookingCard(props: Props): JSX.Element {
  const classes = useStyles();
  const { _id, accepted, declined, start, end, ownerId } = props.booking;
  const { username } = ownerId;

  const getCssClass = () => {
    return props.nextBooking ? clsx(classes.bookingCard, classes.bookingCardNext) : classes.bookingCard;
  };

  const displayCardImage = () => {
    if (props.nextBooking) return <CardImage nextBooking={true} />;
    return <CardImage />;
  };
  return (
    <Box className={classes.bookingCardContainer}>
      <Grid container direction="row" justify="space-between">
        <Box>
          <Box>
            <Label type="date">{displayDateTime(start, end)}</Label>
            <Grid container alignItems="center">
              {displayCardImage()}
              <Label type="name">{username}</Label>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.selectBookingContainer}>
          {!props.nextBooking && <SelectBooking id={_id} />}
          <BookingLabel accepted={accepted} declined={declined} />
        </Box>
      </Grid>
    </Box>
  );
}
