import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  logo: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(3, 0),
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    padding: theme.spacing(1, 5),
    marginRight: theme.spacing(1),
    textTransform: 'uppercase',
  },
  member: {
    padding: theme.spacing(1, 5),
    marginRight: theme.spacing(1),
    fontWeight: 900,
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  textWhite: {
    color: theme.palette.text.secondary,
  },
  avatar: {
    marginRight: theme.spacing(4),
  },
  badge: {
    marginRight: theme.spacing(8),
    '& .MuiBadge-badge': {
      backgroundColor: '#00da02',
    },
  },
  tooltipButton: {
    lineHeight: 0.9,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  HomePage: {
    background: 'transparent',
    boxShadow: 'none',
  },
}));

export default useStyles;
