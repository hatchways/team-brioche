import { useEffect, useMemo, useState } from 'react';
import { Grid, Typography, InputLabel, Select, MenuItem, FormControl, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useAvailability } from '../../context/useAvailabilityContext';
import { useHistory } from 'react-router-dom';
import useInputState from '../../pages/EditProfile/EditProfileForm/useInputState';
interface Props {
  day: string;
  index: number;
  addToArr: any;
}
export default function DayAvailability({ day, index, addToArr }: Props): JSX.Element {
  const classes = useStyles();
  const [fromVal, handleFromChange] = useInputState('');
  const [toVal, handleToChange] = useInputState('');

  const hours = [
    '12AM',
    '1AM',
    '2AM',
    '3AM',
    '4AM',
    '5AM',
    '6AM',
    '7AM',
    '8AM',
    '9AM',
    '10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
    '6PM',
    '7PM',
    '8PM',
    '9PM',
    '10PM',
    '11PM',
  ];
  useEffect(() => {
    const slot = {
      startTime: fromVal,
      endTime: toVal,
    };
    addToArr(slot, index);
  }, [toVal, fromVal, index, addToArr]);
  return (
    <Grid container direction="row" component="main" className={classes.root}>
      <Typography variant="h5">{day}</Typography>
      <Grid container direction="row" className={classes.container}>
        <FormControl className={classes.selectContainer}>
          <InputLabel id="from" shrink={false} className={classes.label}>
            FROM
          </InputLabel>
          <Select
            labelId="from"
            id="fromSelect"
            variant="outlined"
            placeholder="10AM"
            value={fromVal}
            onChange={handleFromChange}
          >
            {hours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.selectContainer}>
          <InputLabel id="to" shrink={false} className={classes.label}>
            TO
          </InputLabel>
          <Select
            labelId="from"
            value={toVal}
            variant="outlined"
            placeholder="10PM"
            onChange={handleToChange}
            id="toSelect"
          >
            {hours.map(
              (hour, i) =>
                i > hours.indexOf(fromVal) && (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ),
            )}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
