import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  dashboard: {
    backgroundColor: theme.palette.grey[200],
  },
  content: {
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
}));

export default useStyles;
