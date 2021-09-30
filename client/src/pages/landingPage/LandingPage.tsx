import { FormEventHandler, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Box, Grid, Typography, TextField, Button } from '@material-ui/core';
import { DatePicker } from '@mui/lab';
import { ParseableDate } from '@mui/lab/internal/pickers/constants/prop-types';
import { generateQueryString } from '../../helpers/queryStringHelpers';
import useStyles from './useStyles';

export default function LandingPage(): JSX.Element {
  const [address, setAddress] = useState('');
  const [dropInDate, setDropInDate] = useState<ParseableDate<undefined>>(null);
  const [dropOffDate, setDropOffDate] = useState<ParseableDate<undefined>>(null);

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const search = generateQueryString({ address, dropInDate, dropOffDate });
    if (search) history.push(`/profile-listing?${search}`);
  };

  return (
    <Grid container justify="center" direction="row-reverse" className={classes.container}>
      <Grid item container justify="center" className={classes.image}></Grid>
      <Grid item container justify="center" direction="column" className={classes.intro}>
        <Typography variant="h2" component="h1" className={classes.introText}>
          Find the care your dog deserves
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container>
            <Box className={classes.address}>
              <TextField
                fullWidth
                value={address}
                placeholder="Anywhere"
                onChange={(e) => setAddress(e.target.value)}
                variant="standard"
                margin="dense"
                className={classes.textField}
                label={
                  <Typography variant="h6" className={classes.label}>
                    Where
                  </Typography>
                }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input,
                }}
              />
            </Box>
            <Box className={classes.picker}>
              <DatePicker
                value={dropInDate}
                onChange={(value) => setDropInDate(value)}
                renderInput={(params) => (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <TextField
                    {...params}
                    variant="standard"
                    margin="dense"
                    className={classes.textField}
                    label={
                      <Typography variant="h6" className={classes.label}>
                        Drop in / Drop off
                      </Typography>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      className: clsx(classes.input, classes.leftBorder),
                    }}
                  />
                )}
              />
              <DatePicker
                value={dropOffDate}
                onChange={(value) => setDropOffDate(value)}
                renderInput={(params) => (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <TextField
                    {...params}
                    variant="standard"
                    margin="dense"
                    className={classes.textField}
                    label={<Typography variant="h6" className={classes.label}></Typography>}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      className: clsx(classes.input, classes.rightBorder),
                    }}
                  />
                )}
              />
            </Box>
            <Button className={classes.button} type="submit" size="large" variant="contained" color="primary">
              <Typography variant="h6" className={classes.buttonText}>
                Find my dog sitter
              </Typography>
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
