import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingGroupContainer: {
    width: '100%',
  },
  bookingGroup: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  upcoming: {
    backgroundColor: 'white',
    width: '100%',
    minWidth: '5rem',
    margin: '0 0 3rem 0',
    padding: '1rem',
  },
  current: {
    width: '100%',
    backgroundColor: 'white',
    padding: theme.spacing(1),
  },
}));

export default useStyles;
