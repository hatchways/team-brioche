import { Box, MenuItem, Select } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { BookingStatusType, useRequest } from '../../../context/useRequestContext';
import useStyles from './useStyle';

interface Props {
  id: string | undefined;
}

export default function SelectBooking({ id }: Props): JSX.Element {
  const classes = useStyles();
  const { modifyBooking } = useRequest();
  return (
    <Box className={classes.selectBox}>
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
