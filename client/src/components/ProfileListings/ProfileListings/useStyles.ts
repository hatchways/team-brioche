import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  Skeleton: {
    height: '50vh',
    width: '20vh',
  },
  loading: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  bolder: {
    fontWeight: 'bolder',
  },
}));

export default useStyles;
