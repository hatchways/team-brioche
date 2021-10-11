import { makeStyles } from '@material-ui/core/styles';
import { borderRadius, width } from '@mui/system';
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
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  textContainer: {
    boxShadow: '0 0',
  },
  text: {
    '& span': { borderRadius: '3px', padding: theme.spacing(2), boxShadow: '0px 0px', width: 'fit-content' },
  },
  leftText: {
    '& span': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  rightText: {
    '& span': {
      backgroundColor: theme.palette.text.secondary,
      marginLeft: 'auto',
    },
  },
}));

export default useStyles;
