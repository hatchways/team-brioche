import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { ParseableDate } from '@mui/lab/internal/pickers/constants/prop-types';

export default function LandingPage(): JSX.Element {
  const [dropInDate, setDropInDate] = useState<ParseableDate<undefined>>(null);
  const [dropOffDate, setDropOffDate] = useState<ParseableDate<undefined>>(null);

  return (
    <Grid container justify="center" style={{ minHeight: '100vh' }}>
      <Grid item container justify="center" style={{ width: '50%' }}>
        <Typography> Find the care your dog deserves</Typography>
        <form onSubmit={() => console.log('submitted')}>
          <Grid container justify="center">
            <DatePicker
              value={dropInDate}
              onChange={(value) => setDropInDate(value)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              value={dropOffDate}
              onChange={(value) => setDropOffDate(value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </form>
      </Grid>
      <Grid item container justify="center" style={{ width: '50%' }}>
        background Image
      </Grid>
    </Grid>
  );
}
