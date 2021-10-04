import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  messengerApp: {
    flexDirection: 'column',
  },
  drawerRoot: {
    marginTop: theme.spacing(5),
  },
}));

export default useStyles;
