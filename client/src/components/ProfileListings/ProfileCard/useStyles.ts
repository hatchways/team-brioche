import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  profileList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
  image: {
    margin: '1rem 0',
    borderRadius: '50%',
    height: theme.spacing(10),
    width: theme.spacing(10),
    objectFit: 'cover',
  },
  paper: {
    display: 'flex',
    margin: theme.spacing(4),
    width: theme.spacing(30),
    height: 'min-content',
    maxHeight: theme.spacing(40),
    overflow: 'hidden',
    '&:hover': {
      overflow: 'auto',
    },
    '&::-webkit-scrollbar': {
      width: '0.25rem',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.secondary.light,
    },
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(30),
      maxHeight: theme.spacing(40),
      margin: theme.spacing(2),
    },
  },
  textBold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  pitch: {
    fontWeight: theme.typography.fontWeightBold,
    padding: '0 10px',
  },
  introduction: {
    color: theme.palette.grey[600],
  },
  footer: {
    borderTop: `2px solid ${theme.palette.grey[400]}`,
    padding: `0.5rem 0.5rem`,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  CardContent: {
    padding: 0,
  },
  addressContainer: {
    width: '75%',
  },
  address: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.grey[400],
  },
  rating: {
    margin: '0.5rem 0',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));

export default useStyles;
