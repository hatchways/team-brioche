import { FormControl, Grid, MenuItem, InputLabel, Typography, Select } from '@mui/material';
import React from 'react';
import useInputState from './useInputState';
const DateSelector = (): JSX.Element => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const fyear = currentYear - 100;
  const years = [];
  for (let i = fyear; i < currentYear; i++) {
    years.push(i);
  }
  function leapYear(year: number) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'Julu',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [yearVal, handleYearChange] = useInputState(2000);
  const [monthVal, handleMonthChange] = useInputState(2000);
  const [dateVal, handleDateChange] = useInputState(2000);
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  return (
    <>
      <FormControl>
        <Grid container>
          <Grid item>
            <InputLabel>Year</InputLabel>
          </Grid>
          <Grid item>
            <Select
              id="yearSelct"
              labelId="year"
              variant="outlined"
              name="year"
              value={yearVal}
              onChange={handleYearChange}
              inputProps={{ 'aria-label': 'Birth Year' }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </FormControl>
      <FormControl>
        <Grid container>
          <InputLabel id="month">
            <Typography variant="button" display="block" gutterBottom>
              Month
            </Typography>
          </InputLabel>
          <Select
            id="monthSelct"
            labelId="month"
            variant="outlined"
            name="month"
            value={monthVal}
            onChange={handleMonthChange}
            inputProps={{ 'aria-label': 'Birth Month' }}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </FormControl>
      <FormControl>
        <Grid container>
          <InputLabel id="date">
            <Typography variant="button" display="block" gutterBottom>
              Date
            </Typography>
          </InputLabel>
          <Select id="dateSelect" labelId="date" variant="outlined" name="date" inputProps={{ 'aria-label': 'age' }}>
            {/* {if(leapYear(yearVal)&& monthVal="February") return({days.splice()}) } */}
          </Select>
        </Grid>
      </FormControl>
    </>
  );
};

export default DateSelector;
