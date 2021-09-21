import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingGroupContainer: {
    minWidth: theme.spacing(350 / 8),
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '65%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '35%',
    },
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
    textTransform: 'uppercase',
    fontWeight: 'bolder',
    fontSize: theme.spacing(5 / 4),
  },
}));

export default useStyles;
