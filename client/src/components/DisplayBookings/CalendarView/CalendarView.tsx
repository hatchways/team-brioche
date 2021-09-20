import Calendar from 'react-calendar';
import { Box, Grid, Paper } from '@material-ui/core';
import useStyles from './useStyle';

export default function CalendarView(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item xl={5} lg={6} md={6} sm={10} xs={12} container justify="center">
      <Box className={classes.calendarContainer}>
        <Paper elevation={5}>
          <Calendar value={new Date()} showFixedNumberOfWeeks={false} />
        </Paper>
      </Box>
    </Grid>
  );
}
