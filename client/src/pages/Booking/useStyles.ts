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
    width: '100%',
    minWidth: '5rem',
    height: '80vh',
    overflow: 'auto',
    backgroundColor: 'white',
    padding: theme.spacing(1),
  },
  upcoming: {
    backgroundColor: 'white',
    width: '100%',
    minWidth: '5rem',
    margin: '0 0 3rem 0',
    padding: '1rem',
  },
  calendar: {},
  bookings: {},
  bookingGroup: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bookingCard: {
    border: '1px solid grey',
    borderRadius: '0.5rem',
    padding: '5px',
    margin: '1rem 0 1rem 0',
  },
  bookingCardNext: {
    border: '',
  },
  image: {
    height: '3rem',
    width: '3rem',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  imageNext: {
    height: '5rem',
    width: '5rem',
  },
}));

export default useStyles;
