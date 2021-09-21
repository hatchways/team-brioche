import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

export default useStyles;
