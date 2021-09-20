import { Box, MenuItem, Select } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Modify, useRequest } from '../../context/useRequestContext';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  selectBox: {
    height: '50%',
  },
}));

interface Props {
  _id: string | undefined;
}

const Icon: React.FunctionComponent = (): JSX.Element => {
  return <SettingsIcon fontSize={'small'} />;
};

export default function SelectBooking({ _id }: Props): JSX.Element {
  const classes = useStyles();
  const { modifyBooking } = useRequest();
  return (
    <Box className={classes.selectBox}>
      <Select
        IconComponent={Icon}
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
