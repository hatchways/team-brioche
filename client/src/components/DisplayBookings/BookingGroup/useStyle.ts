import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingGroupContainer: {
    width: '100%',
  },
  upcoming: {
    backgroundColor: 'white',
    width: '100%',
    minWidth: theme.spacing(20),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2),
  },
  current: {
    width: '100%',
    backgroundColor: 'white',
    padding: theme.spacing(1),
  },
  currentAndPast: {
    height: '60vh',
    overflowX: 'auto',
  },
  label: {
    fontWeight: 'bolder',
    fontSize: theme.spacing(5 / 4),
  },
}));

export default useStyles;
