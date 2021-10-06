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
    border: '1px solid black',
    margin: '2rem 0',
    borderRadius: theme.shape.borderRadius,
    width: '90%',
    height: '200px',
    overflow: 'auto',
  },
  card: {
    border: `2px solid ${theme.palette.grey[300]}`,
    padding: '1rem',
    margin: '1rem',
    width: '250px',
    height: '150px',
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
