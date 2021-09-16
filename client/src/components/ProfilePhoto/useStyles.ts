import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(9),
  },
  title: {
    marginBottom: theme.spacing(9),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatarPanel: {
    marginBottom: theme.spacing(3),
  },
  description: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    fontSize: 14,
  },
  upload: {
    marginBottom: theme.spacing(4),
    width: '100%',
    '& .MuiButtonBase-root': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderColor: theme.palette.primary.main,
      '& .MuiButton-label': {
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  },
  delete: {
    '& .MuiButton-label': {
      fontSize: 14,
      fontWeight: 'normal',
      '& .MuiButton-startIcon': {
        color: 'black',
      },
    },
  },
}));

export default useStyles;
