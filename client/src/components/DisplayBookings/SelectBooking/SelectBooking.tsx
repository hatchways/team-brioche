import { Box, MenuItem, Select } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { useAuth } from '../../../context/useAuthContext';
import { BookingStatusType, useRequest } from '../../../context/useRequestContext';
import { BookingRequest } from '../../../interface/BookingApiData';
import useStyles from './useStyle';

interface Props {
  id: string | undefined;
  isUpcoming?: boolean;
  booking: BookingRequest | null | undefined;
}

export default function SelectBooking({ id, isUpcoming, booking }: Props): JSX.Element {
  const classes = useStyles();
  const { modifyBooking } = useRequest();
  const { profileData } = useAuth();
  const canAcceptRequest = profileData?._id === booking?.sitterId._id;

  if (!canAcceptRequest) return <></>;
  return (
    <Box className={clsx(classes.selectBox, isUpcoming && classes.addFont)}>
      <Select
        IconComponent={SettingsIcon}
        value={''}
        onChange={(e) => modifyBooking(e.target.value as BookingStatusType, id as string)}
        disableUnderline
      >
        <MenuItem value="Accept">Accept</MenuItem>
        <MenuItem value="Decline">Decline</MenuItem>
      </Select>
    </Box>
  );
}
