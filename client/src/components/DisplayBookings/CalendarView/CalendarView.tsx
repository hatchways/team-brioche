import Calendar from 'react-calendar';
import { Box, Grid, Paper } from '@material-ui/core';
import useStyles from './useStyle';
import './calendar.css';

export default function CalendarView(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item md={6} sm={10} xs={11} container justify="center">
      <Box className={classes.calendarContainer}>
        <Paper elevation={5}>
          <Calendar value={new Date()} showFixedNumberOfWeeks={false} />
        </Paper>
      </Box>
    </Grid>
  );
}
