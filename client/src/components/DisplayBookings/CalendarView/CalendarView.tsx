import Calendar from 'react-calendar';
import { Grid, Paper } from '@material-ui/core';
import useStyles from './useStyle';
import './calendar.css';

export default function CalendarView(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item className={classes.calendarContainer} container justifyContent="center">
      <Paper elevation={5}>
        <Calendar value={new Date()} />
      </Paper>
    </Grid>
  );
}
