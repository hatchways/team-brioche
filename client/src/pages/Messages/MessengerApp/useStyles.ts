import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  messengerApp: {
    flexDirection: 'column',
    backgroundColor: theme.palette.text.secondary,
  },
  drawerRoot: {
    marginTop: theme.spacing(5),
  },
  headerContainer: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.text.secondary,
    boxShadow: '1px 2px 6px -3px',
    position: 'fixed',
    top: '110px',
    left: '320px',
    zIndex: 1,
    '& h6': {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(0.5),
    },
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: theme.spacing(4),
    minHeight: '500px',
    overflow: 'scroll',
    justifyContent: 'flex-end',
  },
  text: {
    '& span': {
      borderRadius: '20px',
      padding: theme.spacing(2),
      width: 'fit-content',
      boxShadow: '0px 0px 10px -3px',
    },
  },
  leftText: {
    '& span': {
      backgroundColor: '#F4F4F9',
    },
  },
  rightText: {
    '& span': {
      marginLeft: 'auto',
      textAlign: 'left',
      backgroundColor: theme.palette.text.secondary,
    },
    textField: {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
    sendButton: {
      margin: theme.spacing(1),
    },
  },
}));

export default useStyles;
