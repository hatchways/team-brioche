import { Box, CssBaseline, Grid, Paper, Typography } from '@material-ui/core';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  isLogin?: boolean;
}

const AccountWrapper: FunctionComponent<Props> = ({ children, isLogin }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" component="main" className={classes.root}>
      <CssBaseline />
      <Grid item elevation={6} className={classes.addMargin} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography align="center" className={classes.welcome} component="h1" variant="h5">
                  {isLogin ? 'Login' : 'Sign up'}
                </Typography>
              </Grid>
            </Grid>
            {children}
            <Typography align="center" className={classes.redirect}>
              {isLogin ? 'Dont have an Account?' : 'Already a member?'}
              <Link to={isLogin ? '/signup' : '/login'}>{isLogin ? 'Sign up' : 'Login'}</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountWrapper;
