import { useEffect, useMemo, useState } from 'react';
import { Grid, Typography, InputLabel, Select, MenuItem, FormControl, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import useInputState from '../../pages/EditProfile/EditProfileForm/useInputState';
interface Props {
  day: string;
}
export default function DayAvailability({ day }: Props): JSX.Element {
  const classes = useStyles();
  const [fromVal, handleFromChange] = useInputState('');
  const [toVal, handleToChange] = useInputState('');
  const [toHours, setToHours] = useState([]);
  const { loggedInUser } = useAuth();
  const history = useHistory();
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

  // useEffect(() => {
  //   const pos = hours.indexOf(fromVal);
  //   const newHours = hours.filter((hour, i) => i >= pos);
  //   setToHours(newHours);
  // }, [fromVal, hours]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Typography variant="h5">{day}</Typography>
      <form action="">
        <FormControl className={classes.selectContainer} fullWidth>
          <InputLabel id="demo-simple-select-label">From</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fromVal}
            onChange={handleFromChange}
            label="Age"
          >
            {hours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">To</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={toVal}
            onChange={handleToChange}
            id="demo-simple-select"
            label="Age"
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
      </form>
    </Grid>
  );
}
