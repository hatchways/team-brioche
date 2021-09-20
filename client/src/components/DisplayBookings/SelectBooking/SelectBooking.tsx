import { Box, MenuItem, Select } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Modify, useRequest } from '../../../context/useRequestContext';
import useStyles from './useStyle';

interface Props {
  _id: string | undefined;
}

export default function SelectBooking({ _id }: Props): JSX.Element {
  const classes = useStyles();
  const { modifyBooking } = useRequest();
  return (
    <Box className={classes.selectBox} fontSize="100">
      <Select
        IconComponent={SettingsIcon}
        value={''}
        onChange={(e) => modifyBooking(e.target.value as Modify, _id as string)}
        disableUnderline
      >
        <MenuItem value="Accept">Accept</MenuItem>
        <MenuItem value="Decline">Decline</MenuItem>
      </Select>
    </Box>
  );
}
