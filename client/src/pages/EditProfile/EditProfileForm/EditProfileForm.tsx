import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, InputLabel, FormControl, MenuItem } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
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
  const classes = useStyles();
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
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <InputLabel htmlFor="firstName">
                <Typography variant="button" className={classes.label} display="block" gutterBottom>
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
                InputProps={{
                  classes: { input: classes.inputs },
                }}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <InputLabel htmlFor="lastName">
                <Typography className={classes.label} variant="button" display="block" gutterBottom>
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
                InputProps={{
                  classes: { input: classes.inputs },
                }}
              />
            </Grid>
          </Grid>
          <FormControl className={classes.genderControl}>
            <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={2}>
              <Grid item>
                <InputLabel className={classes.genderLabel} id="genderlbl">
                  <Typography className={classes.label} variant="button" display="block" gutterBottom>
                    Gender
                  </Typography>
                </InputLabel>
              </Grid>
              <Grid item>
                <Select
                  id="gender"
                  labelId="genderlbl"
                  fullWidth
                  value={values.gender}
                  onChange={handleChange}
                  className={classes.select}
                  variant="outlined"
                  name="gender"
                  inputProps={{ 'aria-label': 'age', classes: { input: classes.inputs } }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container className={classes.container} spacing={2}>
              <Grid item>
                <InputLabel className={classes.availLabel} htmlFor="availability">
                  <Typography className={classes.label} variant="button" display="block" gutterBottom>
                    Availability
                  </Typography>
                </InputLabel>
              </Grid>
              <Grid item>
                <Field
                  component={Select}
                  type="text"
                  name="availability"
                  multiple={true}
                  className={classes.availability}
                  inputProps={{
                    name: 'availability',
                    id: 'availability',
                    value: values.availability,
                    onChange: handleChange,
                    MenuProps: MenuProps,
                  }}
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>
          </FormControl>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <InputLabel htmlFor="phone">
                <Typography className={classes.label} variant="button" display="block" gutterBottom>
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
                InputProps={{
                  classes: { input: classes.inputs },
                }}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <InputLabel htmlFor="address">
                <Typography className={classes.label} variant="button" display="block" gutterBottom>
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
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                placeholder="Enter your Address"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <InputLabel htmlFor="description">
                <Typography className={classes.label} variant="button" display="block" gutterBottom>
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
                placeholder="Describe yourself.."
                InputProps={{
                  classes: { input: classes.inputs },
                }}
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
