import { SyntheticEvent } from 'react';
import { Paper, Typography, Box, Button, InputLabel, Grid, List, TextField } from '@material-ui/core';
import useStyles from './useStyles';
import { useHistory } from 'react-router-dom';
import { useSnackBar } from '../../context/useSnackbarContext';
import DayAvailability from '../../components/DayAvailability/DayAvailability';
import { updateAvailability } from '../../helpers/APICalls/profile';
import { Slot } from '../../interface/Profile';
import useInputState from '../EditProfile/EditProfileForm/useInputState';
export default function Availability(): JSX.Element {
  const classes = useStyles();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const { updateSnackBarMessage } = useSnackBar();
  const [rateValue, handleChange] = useInputState(15);
  const history = useHistory();
  const arr: unknown[] = [];
  function addToArr(obj: Slot, index: number) {
    return (arr[index] = obj);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    const data: any = {
      weeklyTimeRange: arr,
      rate: rateValue,
    };
    e.preventDefault();
    updateAvailability(data).then((data) => {
      if (data.status === 200) {
        updateSnackBarMessage('Availability is saved');
        history.push('/dashboard');
      }
      updateSnackBarMessage(data.error);
    });
  };

  return (
    <Paper elevation={3} component="main" className={classes.root}>
      <Box className={classes.form} component="form" display="flex" alignItems="center" onSubmit={handleSubmit}>
        <Typography align="center" variant="h4">
          Availability
        </Typography>
        <Grid container>
          <InputLabel className={classes.rateLabel} htmlFor="rate">
            Hourly Rate
          </InputLabel>
          <TextField
            className={classes.rateField}
            variant="outlined"
            id="rate"
            value={rateValue}
            onChange={handleChange}
          />
        </Grid>
        <List className={classes.list}>
          {daysOfWeek.map((day, i) => (
            <DayAvailability key={day} day={day} index={i} addToArr={addToArr} />
          ))}
        </List>
        <Button variant="outlined" color="primary" className={classes.saveBtn} size="large" type="submit">
          Save
        </Button>
      </Box>
    </Paper>
  );
}
