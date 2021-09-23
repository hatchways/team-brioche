import { useState } from 'react';
import { Button, Typography, Grid, CircularProgress } from '@material-ui/core';
import login from '../../helpers/APICalls/login';
import useStyles from './useStyles';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

// Login credentials for a demo user
const EMAIL = 'd1@g.com';
const PASSWORD = '123456';

export default function DemoUser(): JSX.Element {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const { updateLoginContext } = useAuth();

  const handleLogin = (email: string, password: string) => {
    setIsSubmitting(true);
    login(email, password).then((data) => {
      setIsSubmitting(false);
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <Grid container justify="center" className={classes.addMargin}>
      <Typography className={classes.demoText}>Want to try it out first?</Typography>
      <Button
        onClick={() => handleLogin(EMAIL, PASSWORD)}
        variant="contained"
        color="primary"
        className={classes.demoButton}
      >
        {isSubmitting ? <CircularProgress size={18} className={classes.progress} /> : 'Login as a visitor'}
      </Button>
    </Grid>
  );
}
