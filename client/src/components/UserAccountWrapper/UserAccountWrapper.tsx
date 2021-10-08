import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { FunctionComponent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';
import register from '../../helpers/APICalls/register';
import { AuthApiData } from '../../interface/AuthApiData';
import { HandleLogin, HandleRegister, LoginInput, RegisterInput } from '../../interface/UserAccount';
import useStyles from './useStyles';

type Title = 'Login' | 'Sign up';
interface Props {
  children: (handleLogin: HandleLogin, handleRegister: HandleRegister) => JSX.Element;
  title: Title;
}

const AccountWrapper: FunctionComponent<Props> = ({ children, title }) => {
  const classes = useStyles();
  const { updateLoginContext, updateProfileContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const location = useLocation();
  const history = useHistory();

  const handleLogin = ({ email, password }: LoginInput, { setSubmitting }: FormikHelpers<LoginInput>) => {
    login(email, password).then((data) => {
      handleApiResponse(data, setSubmitting);
    });
  };

  const handleRegister = (
    { username, email, password }: RegisterInput,
    { setSubmitting }: FormikHelpers<RegisterInput>,
  ) => {
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
      updateProfileContext(data.profile);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const path = location.state?.from.pathname || '/dashboard';
      history.push(path);
    } else {
      // should not get here from backend but this catch is for an unknown issue
      console.error({ data });

      setSubmitting(false);
      updateSnackBarMessage('An unexpected error occurred. Please try again');
    }
  }

  return (
    <Grid container justify="center" component="main" className={classes.root}>
      <Grid item elevation={6} className={classes.paper} component={Paper} square>
        <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="space-between">
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography align="center" className={classes.welcome} component="h1" variant="h3">
                  {title}
                </Typography>
              </Grid>
            </Grid>
            {children(handleLogin, handleRegister)}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountWrapper;
