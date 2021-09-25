import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  asideText: string;
  to: string;
  buttonText: string;
}
function Redirect({ asideText, to, buttonText }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Typography align="center" className={classes.redirect}>
      {asideText}
      <Link to={to} className={classes.link}>
        {buttonText}
      </Link>
    </Typography>
  );
}

export default Redirect;
