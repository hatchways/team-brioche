import { Box, MenuItem, Select } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { useAuth } from '../../../context/useAuthContext';
import { BookingStatusType, useRequest } from '../../../context/useRequestContext';
import useStyles from './useStyle';

interface Props {
  id: string | undefined;
  isUpcoming?: boolean;
}

export default function SelectBooking({ id, isUpcoming }: Props): JSX.Element {
  const classes = useStyles();
  const { modifyBooking } = useRequest();
  const { profileData } = useAuth();

  return (
    <Box className={clsx(classes.selectBox, isUpcoming && classes.addFont)}>
      {profileData?.isSitter && (
        <Select
          IconComponent={SettingsIcon}
          value={''}
          onChange={(e) => modifyBooking(e.target.value as BookingStatusType, id as string)}
          disableUnderline
        >
          <MenuItem value="Accept">Accept</MenuItem>
          <MenuItem value="Decline">Decline</MenuItem>
        </Select>
      )}
    </Box>
  );
}
