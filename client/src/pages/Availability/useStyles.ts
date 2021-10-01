import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(4),
    alignSelf: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    margin: theme.spacing(2),
  },
  saveBtn: {
    maxWidth: '200px',
  },
}));

export default useStyles;
