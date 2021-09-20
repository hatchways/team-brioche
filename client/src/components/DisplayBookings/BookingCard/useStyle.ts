import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingCardContainer: {
    border: '1px solid grey',
    margin: '8px 8px',
    borderRadius: '8px',
    padding: '8px 4px',
  },
  selectBookingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  bookingCard: {
    border: '1px solid grey',
    borderRadius: '0.5rem',
    padding: '5px',
    margin: '1rem 0 1rem 0',
  },
  bookingCardNext: {
    border: 'none',
    margin: '0',
    padding: '0',
  },
  bookingSettings: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  label: {
    fontWeight: 'bolder',
    fontSize: '12px',
  },
  labelStatus: {
    color: theme.palette.grey[400],
    marginRight: '16px',
  },
  padLeft: {
    paddingLeft: '8px',
  },
}));

export default useStyles;
