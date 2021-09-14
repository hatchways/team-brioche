import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, Select, InputLabel, FormControl } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
//import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
interface Props {
  handleSubmit: (
    {
      firstname,
      lastname,
      gender,
    }: {
      firstname: string;
      lastname: string;
      gender: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      firstname: string;
      lastname: string;
      gender: string;
    }>,
  ) => void;
}

const EditProfileForm = ({ handleSubmit }: Props): JSX.Element => {
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        gender: '',
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        gender: Yup.string().required('Gender is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="firstname">
                <Typography variant="button" display="block" gutterBottom>
                  First Name
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="firstname"
                margin="normal"
                onChange={handleChange}
                value={values.firstname}
                variant="outlined"
                fullWidth
                placeholder="John"
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <InputLabel htmlFor="lastname">
                <Typography variant="button" display="block" gutterBottom>
                  Last Name
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <TextField
                id="lastname"
                margin="normal"
                onChange={handleChange}
                value={values.lastname}
                variant="outlined"
                fullWidth
                placeholder="Doe"
              />
            </Grid>
          </Grid>
          <FormControl fullWidth>
            <InputLabel htmlFor="gender">
              <Typography variant="button" display="block" gutterBottom>
                Gender
              </Typography>
            </InputLabel>
            <Select
              id="gender"
              value={values.gender}
              onChange={handleChange}
              className=""
              variant="outlined"
              name="gender"
              inputProps={{ 'aria-label': 'age' }}
            >
              <option value="">None</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          {/* <Grid container>
            <Grid item>
              <InputLabel htmlFor="gender">
                <Typography variant="button" display="block" gutterBottom>
                  Gender
                </Typography>
              </InputLabel>
            </Grid>
            <Grid item>
              <NativeSelect
                id="gender"
                value={values.gender}
                onChange={handleChange}
                name="age"
                className=""
                variant="outlined"
                inputProps={{ 'aria-label': 'age' }}
              >
                <option value="">None</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </NativeSelect>
            </Grid>
          </Grid> */}
        </form>
      )}
    </Formik>
  );
};
export default EditProfileForm;
