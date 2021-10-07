import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(4),
    alignSelf: 'center',
  },
  form: {
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  list: {
    width: '100%',
    margin: theme.spacing(2),
  },
  rateLabel: {
    color: 'black',
    margin: theme.spacing(2),
    position: 'relative',
    top: '16px',
  },
  rateField: {
    margin: theme.spacing(2),
  },
  saveBtn: {
    maxWidth: '200px',
  },
}));

export default useStyles;
