import { Box, Grid, Typography } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import { displayDateTime } from '../../../helpers/dateTimeHelper';
import SelectBooking from '../SelectBooking/SelectBooking';
import clsx from 'clsx';
import useStyles from './useStyle';

interface Props {
  booking: BookingRequest;
  isUpcoming?: boolean;
}

export default function BookingCard(props: Props): JSX.Element {
  const classes = useStyles();
  const { _id: id, accepted, declined, start, end, ownerId } = props.booking;
  const { username } = ownerId;

  const getLabel = () => {
    if (accepted) return 'Accepted';
    if (declined) return 'Declined';
    return 'Pending';
  };
  return (
    <Box className={clsx(classes.bookingCardContainer, props.isUpcoming && classes.removeBorder)}>
      <Grid container direction="row" justifyContent="space-between">
        <Box>
          <Box>
            <Typography
              variant="h6"
              className={clsx(classes.label, classes.padbottom, props.isUpcoming && classes.upComingDateLabel)}
            >
              {displayDateTime(start, end)}
            </Typography>
            <Grid container alignItems="center">
              <img
                className={clsx(classes.image, props.isUpcoming && classes.imageNext)}
                src="https://source.unsplash.com/random/500x500"
                alt="Dog Owner"
              ></img>
              <Typography
                variant="h6"
                className={clsx(classes.label, classes.padLeft, props.isUpcoming && classes.upComingDateLabel)}
              >
                {username}
              </Typography>
            </Grid>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="end">
          {!props.isUpcoming && <SelectBooking id={id} booking={props.booking} />}
          <Typography variant="h6" className={clsx(classes.label, classes.labelStatus)}>
            {getLabel()}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}
