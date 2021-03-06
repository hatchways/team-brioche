import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    fontSize: 16,
    color: 'black',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
  },
  forgot: {
    paddingRight: 10,
    color: theme.palette.primary.light,
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    textTransform: 'uppercase',
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  circularProgress: {
    color: 'white',
  },
}));

export default useStyles;
