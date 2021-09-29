import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import clsx from 'clsx';
import { useDebounce } from 'use-debounce/lib';
import queryString from 'query-string';
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Pagination, TextField, Autocomplete } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { ParseableDate } from '@mui/lab/internal/pickers/constants/prop-types';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { getList } from '../../../helpers/APICalls/profileListService';
import { getCurrentSliceIndex } from './../../../helpers/paginationHelpers';
import { verfyProfileQuery } from '../../../helpers/queryStringHelpers';
import { DayRange, Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  address?: string;
  range?: DayRange;
}

// Optional props may be passed to the component directly or through query strings
export default function ProfileListings({ address, range }: Props): JSX.Element {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [uniqueAddress, setUniqueAddress] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showPagination, setShowPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // search parameters
  const [startDate, setStartDate] = useState<ParseableDate<undefined>>(range?.startDate || null);
  const [endDate, setEndDate] = useState<ParseableDate<undefined>>(range?.endDate || null);
  const [addressText, setAddressText] = useState(address || '');

  // limit Api call to max of 1 in 500ms
  const [startDateQuery] = useDebounce(startDate, 500);
  const [endDateQuery] = useDebounce(endDate, 500);
  const [addressQuery] = useDebounce(addressText, 500);

  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const { search } = useLocation();

  useEffect(() => {
    const query = queryString.parse(search);
    const { addressTest, startDateTest, endDateTest } = verfyProfileQuery(query);

    if (addressTest) setAddressText(query.address as string);
    if (startDateTest) setStartDate(query.startDate as string);
    if (endDateTest) setEndDate(query.endDate as string);
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    getList(addressQuery, {
      startDate: startDateQuery?.toLocaleString(),
      endDate: endDateQuery?.toLocaleString(),
    })
      .then((data) => {
        setProfiles(data.profiles);
        setUniqueAddress(data.uniqueAddress);
        // reset pagination after each Query
        setCurrentPage(1);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        updateSnackBarMessage('An error occured while fetching your request please try again');
      });
    return;
  }, [updateSnackBarMessage, addressQuery, startDateQuery, endDateQuery]);

  // Number of profile cards to display at a time
  const PageLimit = 6;

  const numberOfPages = Math.ceil(profiles.length / PageLimit);

  const profileCards = useMemo(() => {
    const sliceIndex = getCurrentSliceIndex(profiles.length, PageLimit, currentPage);
    return profiles
      .slice(sliceIndex.start, sliceIndex.end)
      .map((profile) => <ProfileCard key={profile._id} profile={profile} />);
  }, [profiles, currentPage]);

  // The "toLocaleString" method of type "ParseableDate<undefined>" differs from that of type "Date"
  const getDateString = (date: ParseableDate<undefined>): string => {
    if (date)
      return new Date(date?.toLocaleString() as string).toLocaleDateString('en-US', {
        dateStyle: 'full',
      });
    return '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container direction="column" alignItems="center" className={classes.searchContainer}>
        <Grid item container alignItems="center" direction="column">
          <Typography align="center" variant="h3" component="h1" className={classes.bold}>
            Your search Results
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container justify="center" className={classes.formContainer}>
              <Autocomplete
                id="asynchronous address search"
                options={uniqueAddress}
                onInputChange={(e, value) => setAddressText(value)}
                noOptionsText="No Match Found"
                freeSolo
                autoSelect
                blurOnSelect
                loading={isLoading}
                className={clsx(classes.input, classes.autocomplete)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Address"
                    placeholder="Location e.g Toronto"
                    color="warning"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <SearchIcon color="primary" />,
                    }}
                  />
                )}
              />
              <Box className={classes.input}>
                <DatePicker
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="warning"
                      inputProps={{ ...params.inputProps, className: classes.datePicker }}
                      label="Drop in"
                    />
                  )}
                />
              </Box>
              <Box className={classes.input}>
                <DatePicker
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="warning"
                      inputProps={{ ...params.inputProps, className: classes.datePicker }}
                      label="Drop off"
                    />
                  )}
                />
              </Box>
            </Grid>
          </form>
        </Grid>
        {isLoading ? (
          <Box>
            <Typography variant="h5" align="center">
              Getting search results
            </Typography>
            {[
              ['Address', addressText],
              ['Drop in', getDateString(startDate)],
              ['Drop off', getDateString(endDate)],
            ].map((message) => (
              <Typography key={message[0]}>
                {message[0]}: {message[1]}
              </Typography>
            ))}
            <Box display="flex" justifyContent="center">
              <CircularProgress size="10rem" className={classes.loading} />
            </Box>
          </Box>
        ) : (
          <Grid xl={8} lg={9} md={10} item container justify="center">
            {profiles.length ? profileCards : <Typography variant="h4">No Results to display</Typography>}
            {profiles.length > PageLimit && !showPagination && (
              <Grid container justify="center">
                <Button onClick={() => setShowPagination(true)} variant="outlined" className={classes.button}>
                  <Typography variant="h6" className={classes.bold}>
                    Show more
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        )}
        {showPagination && (
          <Pagination
            onChange={(e, value) => setCurrentPage(value)}
            page={currentPage}
            count={numberOfPages}
            className={classes.pagination}
          />
        )}
      </Grid>
    </LocalizationProvider>
  );
}
