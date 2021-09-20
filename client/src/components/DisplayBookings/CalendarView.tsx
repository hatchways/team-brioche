import Calendar from 'react-calendar';
import { Box, Grid, Paper } from '@material-ui/core';

export default function CalendarView(): JSX.Element {
  return (
    <Grid item xl={5} lg={6} md={6} sm={10} xs={12} container justify="center">
      <Box style={{ paddingBottom: '3rem' }}>
        <Paper elevation={5}>
          <Calendar value={new Date()} showFixedNumberOfWeeks={false} />
        </Paper>
      </Box>
    </Grid>
  );
}
