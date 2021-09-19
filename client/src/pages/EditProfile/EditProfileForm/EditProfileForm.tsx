import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState, useCallback } from 'react';
import {
  Grid,
  InputLabel,
  FormControl,
  OutlinedInput,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Theme, { useTheme } from '@material-ui/styles';
//import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Key } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Calendar from 'react-calendar';

interface Props {
  handleSubmit: (
    {
      firstName,
      lastName,
      gender,
      phone,
      address,
      description,
      availability,
    }: {
      firstName: string;
      lastName: string;
      gender: string;
      phone: number;
      address: string;
      description: string;
      availability: [string];
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      firstName: string;
      lastName: string;
      gender: string;
      phone: number;
      address: string;
      description: string;
      availability: [string];
    }>,
  ) => void;
}

const EditProfileForm = ({ handleSubmit }: Props): JSX.Element => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        phone: 1234567890,
        description: '',
        availability: [''],
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        gender: Yup.string().required('Gender is required'),
        phone: Yup.number().required('Phone number is required'),
        description: Yup.string(),
        availability: Yup.array().required('Availability is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="firstName">
                <Typography variant="button" display="block" gutterBottom>
                  First Name
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="firstName"
                margin="normal"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
                fullWidth
                placeholder="John"
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="lastName">
                <Typography variant="button" display="block" gutterBottom>
                  Last Name
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="lastName"
                margin="normal"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
                fullWidth
                placeholder="Doe"
              />
            </Grid>
          </Grid>
          <FormControl>
            <Grid container>
              <InputLabel id="genderlbl">
                <Typography variant="button" display="block" gutterBottom>
                  Gender
                </Typography>
              </InputLabel>
              <Select
                id="gender"
                labelId="genderlbl"
                value={values.gender}
                onChange={handleChange}
                className=""
                defaultValue="male"
                variant="outlined"
                name="gender"
                inputProps={{ 'aria-label': 'age' }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>
          </FormControl>
          <FormControl>
            <InputLabel shrink={true} htmlFor="availability">
              Availability
            </InputLabel>
            <Field
              component={Select}
              type="text"
              name="availability"
              multiple={true}
              inputProps={{
                name: 'availability',
                id: 'availability',
                value: values.availability,
                onChange: handleChange,
              }}
            >
              <MenuItem value="monday">Monday</MenuItem>
              <MenuItem value="tuesday">Tuesday</MenuItem>
              <MenuItem value="wednesday">Wednesday</MenuItem>
              <MenuItem value="thursday">Thursday</MenuItem>
              <MenuItem value="friday">Friday</MenuItem>
              <MenuItem value="saturday">Saturday</MenuItem>
              <MenuItem value="sunday">Sunday</MenuItem>
            </Field>
          </FormControl>
          {/* <FormControl>
            <Grid container>
              <InputLabel id="month">
                <Typography variant="button" display="block" gutterBottom>
                  Month
                </Typography>
              </InputLabel>
              <Select
                id="monthSelct"
                labelId="month"
                value={values.month}
                onChange={handleChange}
                className=""
                variant="outlined"
                name="date"
                inputProps={{ 'aria-label': 'age' }}
              >
                <option value="jan">January</option>
                <option value="male">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="aug">August</option>
                <option value="sept">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
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
                value={values.date}
                onChange={handleChange}
                className=""
                variant="outlined"
                name="date"
                inputProps={{ 'aria-label': 'age' }}
              ></Select>
            </Grid>
          </FormControl> */}
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="phone">
                <Typography variant="button" display="block" gutterBottom>
                  Phone
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="phone"
                margin="normal"
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
                fullWidth
                placeholder=""
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="address">
                <Typography variant="button" display="block" gutterBottom>
                  Address
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="address"
                margin="normal"
                onChange={handleChange}
                value={values.address}
                variant="outlined"
                fullWidth
                placeholder=""
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="description">
                <Typography variant="button" display="block" gutterBottom>
                  Description
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="description"
                margin="normal"
                multiline
                rows={5}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
                fullWidth
                placeholder=""
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary">
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Create'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default EditProfileForm;
