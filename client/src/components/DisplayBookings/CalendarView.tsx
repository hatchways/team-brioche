import { Box, Grid, Paper, Typography } from '@material-ui/core';
import Calendar from 'react-calendar';

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function CalendarView({ date, setDate }: Props): JSX.Element {
  return (
    <Grid item xl={5} lg={6} md={6} sm={10} xs={12} container justify="center">
      <Box style={{ paddingBottom: '3rem' }}>
        <Paper elevation={5}>
          <Calendar value={date} onChange={setDate} />
        </Paper>
      </Box>
    </Grid>
  );
}
