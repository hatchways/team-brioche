import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addMargin: {
    marginTop: theme.spacing(4),
    paddingBottom: '1rem',
  },
  demoButton: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  demoText: {
    paddingRight: theme.spacing(3),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default useStyles;
