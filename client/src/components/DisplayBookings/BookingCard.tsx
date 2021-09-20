import { Box, Grid, Typography } from '@material-ui/core';
import { BookingRequest } from '../../interface/BookingApiData';
import { displayDateTime } from '../../helpers/dateTimeHelper';
import useStyles from '../../pages/Booking/useStyles';
import CardImage from './CardImage';
import SelectBooking from './SelectBooking';
import BookingLabel from './BookingLabel';

interface Props {
  booking: BookingRequest;
  nextBooking?: boolean;
}

export default function BookingCard(props: Props): JSX.Element {
  const classes = useStyles();
  const { _id, accepted, declined, start, end, ownerId } = props.booking;
  const { username } = ownerId;

  const getCssClass = () => {
    const baseClass = classes.bookingCard;
    const derivedClass = baseClass + classes.bookingCardNext;
    return props.nextBooking ? derivedClass : baseClass;
  };

  const displayCardImage = () => {
    if (props.nextBooking) return <CardImage nextBooking={true} />;
    return <CardImage />;
  };
  return (
    <Grid container className={getCssClass()}>
      <Grid item style={{ width: '70%' }}>
        <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
          {displayDateTime(start, end)}
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {displayCardImage()}
          <Typography variant="subtitle2" style={{ padding: '0.5rem' }}>
            {username}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        style={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {!props.nextBooking && <SelectBooking _id={_id} />}
        <BookingLabel nextBooking={props.nextBooking} accepted={accepted} declined={declined} />
      </Grid>
    </Grid>
  );
}
