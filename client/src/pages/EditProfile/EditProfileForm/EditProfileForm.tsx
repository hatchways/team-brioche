import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, MenuItem } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const { updateSnackBarMessage } = useSnackBar();
  const { updateProfileContext, profileData } = useAuth();
  const [value, setValue] = useState<Date | null>(null);
  const handleSubmit = (
    { firstName, lastName, gender, introduction, pitch, phone, address, description }: Profile,
    { setSubmitting }: FormikHelpers<Profile>,
  ) => {
    !profileData
      ? profileCreate(firstName, lastName, gender, introduction, pitch, phone, address, description).then((data) => {
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
          { firstName, lastName, gender, introduction, pitch, phone, address, description },
          profileData.profileId!,
        ).then((data) => {
          if (data.error) {
            setSubmitting(false);
            updateSnackBarMessage(data.error.message);
          } else if (data) {
            setSubmitting(false);
            updateSnackBarMessage('Profile Updated');
            updateProfileContext(data);
          }
        });
  };
  const validateSchema = {
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    introduction: Yup.string().required('Introduction is required'),
    pitch: Yup.string().required('Pitch is required'),
    phone: Yup.number().required('Phone number is required'),
    description: Yup.string().required('Description is required'),
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
        gender: 'male',
        address: '',
        introduction: 'Some Intro',
        pitch: '',
        phone: 1234567890,
        description: '',
      }}
      validationSchema={Yup.object().shape(validateSchema)}
      validateOnChange
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
            <Grid container alignItems="flex-start" spacing={2}>
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
          <Grid container className={classes.container} spacing={2}>
            <Label htmlFor="introduction" cls={classes.label} labelName="Introduction" />
            <Grid item>
              <TextField
                id="introduction"
                margin="normal"
                onChange={handleChange}
                value={values.introduction}
                variant="outlined"
                fullWidth
                placeholder="Doe"
                InputProps={{
                  classes: { input: classes.inputs },
                }}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container} spacing={2}>
            <Label htmlFor="pitch" cls={classes.label} labelName="Pitch" />
            <Grid item>
              <TextField
                id="pitch"
                margin="normal"
                onChange={handleChange}
                value={values.pitch}
                variant="outlined"
                fullWidth
                placeholder="Dog sitting, bird sitting,etc"
                InputProps={{
                  classes: { input: classes.inputs },
                }}
              />
            </Grid>
          </Grid>
          <Grid container className={`${classes.container} ${classes.phoneContainer}`} spacing={2}>
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
              />
            </Grid>
          </Grid>
          <Grid container className={`${classes.addressContainer} ${classes.container}`} spacing={2}>
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
          <Grid container className={`${classes.descContainer} ${classes.container}`} spacing={2}>
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
