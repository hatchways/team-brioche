import { Box, CssBaseline, Grid, Paper, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';
import register from '../../helpers/APICalls/register';
import { AuthApiData } from '../../interface/AuthApiData';
import { HandleLogin, HandleRegister, Login, Register } from '../../interface/UserAccount';
import useStyles from './useStyles';

interface Props {
  children: (handleLogin: HandleLogin, handleRegister: HandleRegister) => JSX.Element;
  isLoginForm?: boolean;
}

const AccountWrapper: FunctionComponent<Props> = ({ children, isLoginForm }) => {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleLogin = ({ email, password }: Login, { setSubmitting }: FormikHelpers<Login>) => {
    login(email, password).then((data) => {
      handleApiResponse(data, setSubmitting);
    });
  };

  const handleRegister = ({ username, email, password }: Register, { setSubmitting }: FormikHelpers<Register>) => {
    register(username, email, password).then((data) => {
      handleApiResponse(data, setSubmitting);
    });
  };

  function handleApiResponse(data: AuthApiData, setSubmitting: (value: boolean) => void) {
    if (data.error) {
      setSubmitting(false);
      updateSnackBarMessage(data.error.message);
    } else if (data.success) {
      updateLoginContext(data.success);
    } else {
      // should not get here from backend but this catch is for an unknown issue
      console.error({ data });

      setSubmitting(false);
      updateSnackBarMessage('An unexpected error occurred. Please try again');
    }
  }

  return (
    <Grid container justify="center" component="main" className={classes.root}>
      <CssBaseline />
      <Grid item elevation={6} className={classes.addMargin} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography align="center" className={classes.welcome} component="h1" variant="h5">
                  {isLoginForm ? 'Login' : 'Sign up'}
                </Typography>
              </Grid>
            </Grid>
            {children(handleLogin, handleRegister)}
            <Typography align="center" className={classes.redirect}>
              {isLoginForm ? 'Dont have an Account?' : 'Already a member?'}
              <Link to={isLoginForm ? '/signup' : '/login'}>{isLoginForm ? 'Sign up' : 'Login'}</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountWrapper;
