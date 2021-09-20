import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  bookingCard: {
    border: '1px solid grey',
    borderRadius: '0.5rem',
    padding: '5px',
    margin: '1rem 0 1rem 0',
  },
  bookingCardNext: {
    border: '',
  },
  bookingSettings: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));

export default useStyles;
