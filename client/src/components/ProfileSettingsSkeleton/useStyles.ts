import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
  },
  nav: {
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '30%',
      paddingLeft: theme.spacing(12),
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
    },
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    color: theme.palette.grey[500],
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&:hover': {
      color: 'black',
    },
  },
  active: {
    color: 'black',
  },
  section: {
    padding: '3rem 0rem',
    overflow: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
  },
  menu: {
    width: '100%',
    position: 'sticky',
    top: 0,
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default useStyles;
