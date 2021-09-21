import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingCardContainer: {
    border: '2px solid',
    borderColor: theme.palette.grey[200],
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  image: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    objectFit: 'cover',
    borderRadius: '50%',
  },
  imageNext: {
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
  removeBorder: {
    border: 'none',
    marginTop: '0',
    padding: '0',
  },
  bookingCardNext: {
    border: 'none',
    margin: '0',
    padding: '0',
  },
  label: {
    fontWeight: 'bolder',
    fontSize: theme.spacing(3 / 2),
  },
  upComingDateLabel: {
    fontSize: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.6),
    },
  },
  labelStatus: {
    color: theme.palette.grey[400],
    marginRight: theme.spacing(2),
  },
  padLeft: {
    paddingLeft: theme.spacing(1),
  },
  padbottom: {
    paddingBottom: theme.spacing(1),
  },
}));

export default useStyles;
