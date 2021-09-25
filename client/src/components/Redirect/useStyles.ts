import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  redirect: {
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(4),
  },
  link: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
