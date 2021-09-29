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
    marginTop: '0',
    marginBottom: '0',
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
    maxWidth: theme.spacing(45),
    minHeight: theme.spacing(45),
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
    borderTop: `2px solid ${theme.palette.grey[400]}`,
    padding: `1.5rem 0.5rem`,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  cardBody: {
    padding: `${theme.spacing(1)} 0`,
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
    margin: '2rem 0',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));

export default useStyles;
