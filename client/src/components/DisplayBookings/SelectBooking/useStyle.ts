import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  selectBox: {
    height: '50%',
    '& .MuiSvgIcon-root': {
      fontSize: '13px !important',
      color: theme.palette.grey[400],
    },
  },
  addFont: {
    '& .MuiSvgIcon-root': {
      fontSize: '20px !important',
    },
  },
}));

export default useStyles;
