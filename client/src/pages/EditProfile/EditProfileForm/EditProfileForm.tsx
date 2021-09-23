import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, InputLabel, FormControl, MenuItem } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import Select from '@mui/material/Select';
import { profileCreate, profileUpdate } from '../../../helpers/APICalls/profile';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Profile } from '../../../interface/Profile';
import { useAuth } from '../../../context/useAuthContext';
import Label from './Label';

const EditProfileForm = (): JSX.Element => {
  const classes = useStyles();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const { updateSnackBarMessage } = useSnackBar();
  const { updateProfileContext, profileData } = useAuth();
  const handleSubmit = (
    { firstName, lastName, gender, phone, address, description, availability }: Profile,
    { setSubmitting }: FormikHelpers<Profile>,
  ) => {
    !profileData
      ? profileCreate(firstName, lastName, gender, phone, address, description, availability).then((data) => {
          if (data.error) {
            setSubmitting(false);
            updateSnackBarMessage(data.error.message);
          } else if (data) {
            setSubmitting(false);
            updateSnackBarMessage('Profile Created');
            updateProfileContext(data);
          } else {
            setSubmitting(false);
          }
        })
      : profileUpdate(
          { firstName, lastName, gender, phone, address, description, availability },
          profileData.profileId,
        ).then((data) => {
          if (data.error) {
            setSubmitting(false);
            updateSnackBarMessage(data.error.message);
          } else if (data) {
            console.log('update worked');
            setSubmitting(false);
            updateSnackBarMessage('Profile Updated');
            updateProfileContext(data);
          }
        });
    //================
    // profileCreate(firstName, lastName, gender, phone, address, description, availability).then((data) => {
    //   if (data.error) {
    //     setSubmitting(false);
    //     updateSnackBarMessage(data.error.message);
    //   } else if (data) {
    //     setSubmitting(false);
    //     updateSnackBarMessage('Profile Created');
    //     updateProfileContext(data);
    //   } else {
    //     setSubmitting(false);
    //   }
    // });
  };
  const validateSchema = {
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.number().required('Phone number is required'),
    description: Yup.string(),
    availability: Yup.array().required('Availability is required'),
  };
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
      validationSchema={Yup.object().shape(validateSchema)}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container className={classes.container} spacing={2}>
            <Label htmlFor="firstName" cls={classes.label} labelName="First Name" />
            <Grid item>
              <TextField
                id="firstName"
                margin="normal"
                onChange={handleChange}
                value={values.firstName}
                helperText={touched.firstName && errors.firstName}
                error={touched.firstName && Boolean(errors.firstName)}
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
            <Label htmlFor="lastName" cls={classes.label} labelName="Last Name" />
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
              <Label cls={classes.label} labelName="Gender" htmlFor="gender" />
              <Grid item>
                <Select
                  id="gender"
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
              <Label htmlFor="availability" cls={`${classes.label} ${classes.availLabel}`} labelName="Availability" />
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
            <Label htmlFor="phone" cls={classes.label} labelName="Phone Number" />
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
            <Label htmlFor="address" cls={classes.label} labelName="Address" />
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
            <Label htmlFor="description" cls={classes.label} labelName="Description" />
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
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : profileData ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default EditProfileForm;
