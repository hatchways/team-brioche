import { makeStyles } from '@material-ui/core/styles';
import { relative } from 'path';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
    border: '1px solid #cfcbca',
    borderBottom: 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:last-child': {
      borderBottom: '1px solid #cfcbca',
    },
  },
  container: {
    width: '60%',
    justifyContent: 'space-between',
  },
  selectContainer: {
    margin: theme.spacing(2),
    width: '36%',
    justifySelf: 'flex-end',
  },
  label: {
    position: 'relative',
    left: '-46px',
    top: '10px',
  },
}));

export default useStyles;
