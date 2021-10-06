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
    height: '300px',
    overflow: 'auto',
  },
  card: {
    border: `2px solid ${theme.palette.grey[300]}`,
    padding: '1rem',
    margin: '1rem',
    width: '300px',
    minHeight: '200px',
    height: 'min-content',
    borderRadius: theme.shape.borderRadius,
  },
  bold: {
    marginTop: '10px',
    fontWeight: theme.typography.fontWeightBold,
  },
  light: {
    color: theme.palette.grey[400],
  },
  image: {
    height: '50px',
    width: '100px',
    objectFit: 'cover',
  },
}));

export default useStyles;
