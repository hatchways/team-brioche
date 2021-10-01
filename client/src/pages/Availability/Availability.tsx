import { useState, SyntheticEvent } from 'react';
import { Grid, Typography, Box, Button, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory, useParams } from 'react-router-dom';
import DayAvailability from '../../components/DayAvailability/DayAvailability';
import { updateAvailability } from '../../helpers/APICalls/profile';
export default function Availability(): JSX.Element {
  const classes = useStyles();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  interface Slot {
    startTime?: string;
    endTime?: string;
  }
  const arr: unknown[] = [];
  function addToArr(obj: Slot, index: number) {
    return (arr[index] = obj);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    const data: any = {
      weeklyTimeRange: arr,
    };
    e.preventDefault();
    updateAvailability(data);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4">Availability</Typography>
        {daysOfWeek.map((day, i) => (
          <DayAvailability key={day} day={day} index={i} addToArr={addToArr} />
        ))}
        <Button type="submit">Submit</Button>
      </Box>
    </Grid>
  );
}
