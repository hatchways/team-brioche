import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: '100vh',
  },
  bookingCard: {
    border: '1px solid grey',
    borderRadius: '0.5rem',
    padding: '5px',
    margin: '1rem 0 1rem 0',
  },
}));

export default useStyles;
