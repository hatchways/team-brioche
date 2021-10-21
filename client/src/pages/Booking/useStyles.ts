import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    backgroundColor: theme.palette.grey[200],
    minHeight: '100vh',
    minWidth: theme.spacing(370 / 8),
  },
  circularProgress: {
    marginTop: '5rem',
  },
}));

export default useStyles;
