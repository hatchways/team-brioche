import { FormControl, Grid, MenuItem, InputLabel, Typography, Select } from '@mui/material';

import { useEffect, useState } from 'react';

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
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [yearVal, handleYearChange] = useInputState(2000);
  const [monthVal, handleMonthChange] = useInputState(0);
  const [dateVal, handleDateChange] = useInputState(0);
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const sMonths = ['April', 'June', 'September', 'November'];
  const lMonths = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
  const feb = [...dates].splice(0, 28);
  const leapFeb = [...dates].splice(0, 29);
  const sDates = [...dates].splice(0, 30);
  const [dob, setDob] = useState('');
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
          <Select
            id="dateSelect"
            labelId="date"
            variant="outlined"
            name="date"
            onChange={handleDateChange}
            value={dateVal}
            inputProps={{ 'aria-label': 'date' }}
          >
            {leapYear(yearVal) &&
              monthVal === 'February' &&
              leapFeb.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            {!leapYear(yearVal) &&
              monthVal === 'February' &&
              feb.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            {sMonths.indexOf(monthVal) !== -1 &&
              sDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            {lMonths.indexOf(monthVal) !== -1 &&
              dates.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
          </Select>
        </Grid>
      </FormControl>
    </>
  );
};

export default DateSelector;
