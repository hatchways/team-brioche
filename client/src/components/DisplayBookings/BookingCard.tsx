import SettingsIcon from '@material-ui/icons/Settings';
import { Box, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { BookingRequest } from '../../interface/BookingApiData';
import { displayDateTime } from '../../helpers/dateTimeHelper';
import useStyles from '../../pages/Booking/useStyles';
import CardImage from './CardImage';
import { Modify, useRequest } from '../../context/useRequestContext';

interface Props {
  booking: BookingRequest;
  nextBooking?: boolean;
}

export default function BookingCard(props: Props): JSX.Element {
  const classes = useStyles();
  const { _id, accepted, declined, start, end, ownerId } = props.booking;
  const { username } = ownerId;

  const { modifyBooking } = useRequest();

  const getCssClass = () => {
    const baseClass = classes.bookingCard;
    const derivedClass = baseClass + classes.bookingCardNext;
    if (props.nextBooking) return derivedClass;
    return baseClass;
  };
  return (
    <Grid container className={getCssClass()}>
      <Grid item style={{ width: '70%' }}>
        <Typography variant="subtitle2" style={{ fontWeight: 'bolder' }}>
          {displayDateTime(start, end)}
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <CardImage />
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
        <Box style={{ height: '50%' }}>
          <Select
            IconComponent={SettingsIcon}
            value={''}
            onChange={(e) => modifyBooking(e.target.value as Modify, _id)}
          >
            <MenuItem value="Accept">Accept</MenuItem>
            <MenuItem value="Decline">Decline</MenuItem>
          </Select>
        </Box>
        <Box>
          {accepted && !declined && <Typography>Accepted</Typography>}
          {declined && <Typography>Declined</Typography>}
        </Box>
      </Grid>
    </Grid>
  );
}
