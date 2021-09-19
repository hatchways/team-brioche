import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: '100vh',
  },
  main: {
    justifyContent: 'space-around',
    padding: theme.spacing(2),
  },
  current: {
    height: '80vh',
    overflow: 'auto',
    backgroundColor: 'white',
    padding: theme.spacing(1),
  },
  upcoming: {
    backgroundColor: 'white',
    margin: '0 0 3rem 0',
    padding: '5px',
  },
  calendar: {},
  bookings: {},
  bookingGroup: {
    justifyContent: 'space-evenly',
  },
  bookingCard: {
    border: '1px solid grey',
    padding: '5px',
    margin: '0.5rem 0 0.5rem 0',
  },
  image: {
    height: '5rem',
    width: '5rem',
    objectFit: 'cover',
    borderRadius: '50%',
  },
}));

export default useStyles;
