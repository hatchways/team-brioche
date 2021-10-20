import { useState } from 'react';
import { Button, Typography, Grid, CircularProgress } from '@material-ui/core';
import login from '../../helpers/APICalls/login';
import useStyles from './useStyles';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

// login credentials
const email = 'demoUser@g.com';
const password = '123456';
export default function DemoUser(): JSX.Element {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const { updateLoginContext, updateProfileContext } = useAuth();

  const handleLogin = (email: string, password: string) => {
    setIsSubmitting(true);
    login(email, password).then((data) => {
      setIsSubmitting(false);
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
        updateProfileContext(data.profile);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.addMargin}>
      <Typography className={classes.demoText}>Want to try it out first?</Typography>
      <Button
        onClick={() => handleLogin(email, password)}
        variant="contained"
        color="primary"
        className={classes.demoButton}
      >
        {isSubmitting ? <CircularProgress size={18} className={classes.progress} /> : 'Guest login'}
      </Button>
    </Grid>
  );
}
