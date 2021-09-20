import { Box, Grid } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import { displayDateTime } from '../../../helpers/dateTimeHelper';
import CardImage from '../CardImage/CardImage';
import SelectBooking from '../SelectBooking/SelectBooking';
import BookingLabel from '../BookingLabel/BookingLabel';
import Label from '../Label/Label';
import useStyles from './useStyle';

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
        <Label type="date">{displayDateTime(start, end)}</Label>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {displayCardImage()}
          <Label type="name">{username}</Label>
        </Box>
      </Grid>
      <Grid item className={classes.bookingSettings}>
        {!props.nextBooking && <SelectBooking _id={_id} />}
        <BookingLabel accepted={accepted} declined={declined} />
      </Grid>
    </Grid>
  );
}
