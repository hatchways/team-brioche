import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    marginBottom: theme.spacing(8),
    paddingTop: '1rem',
    height: '60%',
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '35%',
    },
  },
}));

export default useStyles;
