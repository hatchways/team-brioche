import { useState, SyntheticEvent } from 'react';
import { Grid, Typography, Box, Button, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import DayAvailability from '../../components/DayAvailability/DayAvailability';
export default function Availability(): JSX.Element {
  const classes = useStyles();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const { loggedInUser } = useAuth();
  const history = useHistory();
  // const availArr = [];
  // const [availability, setAvailability] = useState();
  const handleSubmit = (e: SyntheticEvent) => {
    const arr = [];
    e.preventDefault();
    console.log(e.target);
  };
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4">Availability</Typography>
        {daysOfWeek.map((day) => (
          <DayAvailability key={day} day={day} />
        ))}
        <Button type="submit">Submit</Button>
      </Box>
    </Grid>
  );
}
