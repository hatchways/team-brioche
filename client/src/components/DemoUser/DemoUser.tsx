import { Button, Typography, Grid } from '@material-ui/core';
import useStyles from './useStyles';

export default function DemoUser(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.addMargin}>
      <Typography className={classes.demoText}>Want to try it out first?</Typography>
      <Button variant="contained" color="primary" className={classes.demoButton}>
        Login as visitor
      </Button>
    </Grid>
  );
}
