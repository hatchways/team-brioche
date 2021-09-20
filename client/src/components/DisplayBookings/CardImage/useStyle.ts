import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    objectFit: 'cover',
    borderRadius: '50%',
  },
  imageNext: {
    height: theme.spacing(10),
    width: theme.spacing(10),
    objectFit: 'cover',
    borderRadius: '50%',
  },
}));

export default useStyles;
