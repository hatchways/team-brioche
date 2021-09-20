import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    height: '3rem',
    width: '3rem',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  imageNext: {
    height: '5rem',
    width: '5rem',
    objectFit: 'cover',
    borderRadius: '50%',
  },
}));

export default useStyles;
