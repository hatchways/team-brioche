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
    paddingBottom: theme.spacing(15),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
}));

export default useStyles;
