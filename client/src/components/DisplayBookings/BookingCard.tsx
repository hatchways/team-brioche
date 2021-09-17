import { BookingRequest } from '../../interface/BookingApiData';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import { displayDateTime } from './../../helpers/datTimeHelper';
import SettingsIcon from '@material-ui/icons/Settings';
import useStyles from '../../pages/Booking/useStyles';
import CardImage from './CardImage';
import { Modify, useRequest } from '../../context/useRequestContext';

interface Props {
  booking: BookingRequest;
}

export default function BookingCard(props: Props): JSX.Element {
  const classes = useStyles();
  const { _id, accepted, declined, start, end, dogOwner } = props.booking;
  const { username } = dogOwner;
  const { modifyBooking } = useRequest();

  return (
    <Box className={classes.bookingCard}>
      <Typography variant="h6">{displayDateTime(start, end)}</Typography>
      <Typography>{username}</Typography>
      <CardImage />
      <Box style={{ display: 'inline' }}>
        <Select IconComponent={SettingsIcon} value={''} onChange={(e) => modifyBooking(e.target.value as Modify, _id)}>
          <MenuItem value="Accept">Accept</MenuItem>
          <MenuItem value="Decline">Decline</MenuItem>
        </Select>
      </Box>
      <Box>
        {accepted && !declined && <Typography>Accepted</Typography>}
        {declined && <Typography>Declined</Typography>}
      </Box>
    </Box>
  );
}