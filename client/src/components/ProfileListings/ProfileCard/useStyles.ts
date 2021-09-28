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
  imageContainer: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: '0.2rem',
    },
  },
  image: {
    borderRadius: '50%',
    height: theme.spacing(14),
    width: theme.spacing(14),
    objectFit: 'cover',
  },
  paper: {
    maxWidth: theme.spacing(40),
    minHeight: theme.spacing(40),
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(30),
      maxHeight: theme.spacing(40),
      overflow: 'hidden',
    },
    '&:hover': {
      overflow: 'auto',
    },
    '&::-webkit-scrollbar': {
      width: '0.25rem',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.secondary.light,
    },
  },
  textBold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  introduction: {
    color: theme.palette.grey[600],
  },
  footer: {
    borderTopColor: theme.palette.grey[400],
    borderTopStyle: 'solid',
    borderTopWidth: '2px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  cardBody: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  addressContainer: {
    width: '75%',
  },
  address: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.grey[400],
  },
  rating: {
    color: '#ebc934',
  },
}));

export default useStyles;
