import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: '1rem',
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    width: '100%',
    margin: '2rem 0',
  },
  subheading: {
    width: '100%',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[400],
  },
  cardContainer: {
    margin: '2rem 0',
    borderRadius: theme.shape.borderRadius,
    width: '90%',
    minHeight: '6rem',
  },
}));

export default useStyles;
