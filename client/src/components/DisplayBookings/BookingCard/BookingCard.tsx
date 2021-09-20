import { Box, Grid, Typography } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import { displayDateTime } from '../../../helpers/dateTimeHelper';
import CardImage from '../CardImage/CardImage';
import SelectBooking from '../SelectBooking/SelectBooking';
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
            <Typography variant="h6" className={clsx(classes.label)}>
              {displayDateTime(start, end)}
            </Typography>
            <Grid container alignItems="center">
              {displayCardImage()}
              <Typography variant="h6" className={clsx(classes.label, classes.padLeft)}>
                {username}
              </Typography>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.selectBookingContainer}>
          {!props.nextBooking && <SelectBooking id={_id} />}
          {accepted && (
            <Typography variant="h6" className={clsx(classes.label, classes.labelStatus)}>
              Accepted
            </Typography>
          )}
          {declined && (
            <Typography variant="h6" className={clsx(classes.label, classes.labelStatus)}>
              Declined
            </Typography>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
