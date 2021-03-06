import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import clsx from 'clsx';
import { useDebounce } from 'use-debounce/lib';
import queryString from 'query-string';
import { Box, Button, CircularProgress, Grid, Typography, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Pagination, TextField, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { ParseableDate } from '@mui/lab/internal/pickers/constants/prop-types';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { getProfileList } from '../../../helpers/APICalls/profileListService';
import { getCurrentSliceIndex } from './../../../helpers/paginationHelpers';
import { verfyProfileQuery } from '../../../helpers/queryStringHelpers';
import { DayRange, Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  address?: string;
  range?: DayRange;
}

export default function ProfileListings({ address, range }: Props): JSX.Element {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [uniqueAddress, setUniqueAddress] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showPagination, setShowPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [addressText, setAddressText] = useState(address || '');
  const [dropInDate, setDropInDate] = useState<ParseableDate<undefined>>(range?.dropInDate || null);
  const [dropOffDate, setDropOffDate] = useState<ParseableDate<undefined>>(range?.dropOffDate || null);

  const [dropInDateQuery] = useDebounce(dropInDate, 500);
  const [dropOffDateQuery] = useDebounce(dropOffDate, 500);
  const [addressQuery] = useDebounce(addressText, 500);

  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const { search } = useLocation();

  useEffect(() => {
    const query = queryString.parse(search);
    if (!query.address && !query.dropInDate && !query.dropOffDate) return;

    const { address, dropInDate, dropOffDate } = verfyProfileQuery(query);

    if (address.test) setAddressText(address.value);
    if (dropInDate.test) setDropInDate(dropInDate.value);
    if (dropOffDate.test) setDropOffDate(dropOffDate.value);
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    getProfileList(addressQuery, {
      dropInDate: dropInDateQuery?.toLocaleString(),
      dropOffDate: dropOffDateQuery?.toLocaleString(),
    })
      .then((data) => {
        setProfiles(data.profiles);
        setUniqueAddress(data.uniqueAddress);
        setCurrentPage(1);
        setIsLoading(false);
      })
      .catch((error) => {
        setShowPagination(false);
        setIsLoading(false);
        updateSnackBarMessage(error.message || 'An error has occured please try again');
      });
  }, [updateSnackBarMessage, addressQuery, dropInDateQuery, dropOffDateQuery]);

  const pageLimit = 6;

  const numberOfPages = Math.ceil(profiles.length / pageLimit);

  const profileCards = useMemo(() => {
    const sliceIndex = getCurrentSliceIndex(profiles.length, pageLimit, currentPage);
    return profiles
      .slice(sliceIndex.start, sliceIndex.end)
      .map((profile) => <ProfileCard key={profile._id} profile={profile} />);
  }, [profiles, currentPage]);

  const getDateString = (date: ParseableDate<undefined>): string => {
    if (date)
      return new Date(date?.toLocaleString() as string).toLocaleDateString('en-US', {
        dateStyle: 'full',
      });
    return '';
  };

  const tooltipMessage = 'Your results are displayed automatically when you enter a search query';
  const handleSearchIconClick = () => updateSnackBarMessage(tooltipMessage);

  return (
    <Grid container direction="column" alignItems="center" className={classes.searchContainer}>
      <Grid item container alignItems="center" direction="column">
        <Typography align="center" variant="h3" component="h1" className={classes.bold}>
          Your search Results
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container justifyContent="center" className={classes.formContainer}>
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
                  placeholder="Location e.g Toronto"
                  color="warning"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <Tooltip title={tooltipMessage}>
                        <SearchIcon color="primary" className={classes.iconTooltip} onClick={handleSearchIconClick} />
                      </Tooltip>
                    ),
                  }}
                />
              )}
            />
            <Box className={classes.input}>
              <DatePicker
                value={dropInDate}
                onChange={(value) => setDropInDate(value)}
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
                value={dropOffDate}
                onChange={(value) => setDropOffDate(value)}
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
          <Typography>Address: {addressText}</Typography>
          <Typography>Drop In: {getDateString(dropInDate)}</Typography>
          <Typography>Drop Off: {getDateString(dropOffDate)}</Typography>
          <Box display="flex" justifyContent="center">
            <CircularProgress size="10rem" className={classes.loading} />
          </Box>
        </Box>
      ) : (
        <Grid xl={8} lg={9} md={10} item container justifyContent="center">
          {profiles.length ? profileCards : <Typography variant="h4">No Results to display</Typography>}
          {profiles.length > pageLimit && !showPagination && (
            <Grid container justifyContent="center">
              <Button onClick={() => setShowPagination(true)} variant="outlined" className={classes.button}>
                <Typography variant="h6" className={classes.bold}>
                  Show more
                </Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      {!isLoading && showPagination && (
        <Pagination
          onChange={(e, value) => setCurrentPage(value)}
          page={currentPage}
          count={numberOfPages}
          className={classes.pagination}
        />
      )}
    </Grid>
  );
}
