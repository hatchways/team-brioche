import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, InputLabel } from '@material-ui/core';
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
    }: {
      firstname: string;
      lastname: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      firstname: string;
      lastname: string;
    }>,
  ) => void;
}

const EditProfileForm = ({ handleSubmit }: Props): JSX.Element => {
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
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
          <TextField
            id="lastname"
            label={<Typography className="">Doe</Typography>}
            margin="normal"
            onChange={handleChange}
            value={values.lastname}
            variant="outlined"
            fullWidth
            placeholder="John"
            InputLabelProps={{
              shrink: true,
              variant: 'standard',
            }}
          />
        </form>
      )}
    </Formik>
  );
};
export default EditProfileForm;
