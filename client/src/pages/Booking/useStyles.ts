import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: '100vh',
    width: '100vw',
  },
  main: {
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  current: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
  },
  upcoming: {
    backgroundColor: 'white',
    margin: theme.spacing(1),
  },
  calendar: {
    margin: '20px',
  },
  bookings: {
    margin: '20px',
    border: '2px solid black',
    height: '80vh',
    overflow: 'auto',
  },
  bookingCard: {
    border: '1px solid grey',
    padding: '5px',
    margin: '0.5rem 0 0.5rem 0',
  },
}));

export default useStyles;
