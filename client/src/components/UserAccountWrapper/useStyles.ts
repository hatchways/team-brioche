import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    paddingTop: 23,
    height: 'min-content',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '85%',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
  welcome: {
    fontSize: 30,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },

  redirect: {
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(4),
    '& a': {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1),
    },
  },
}));

export default useStyles;
