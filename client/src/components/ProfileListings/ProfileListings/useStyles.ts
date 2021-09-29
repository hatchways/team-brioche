import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: `${theme.spacing(10)}px 0`,
  },
  searchContainer: {
    margin: `${theme.spacing(4)}px 0`,
  },
  bold: {
    fontWeight: 'bolder',
  },
  formContainer: {
    marginBottom: '2rem',
  },
  button: {
    margin: `${theme.spacing(4)}px 0`,
    padding: '1rem 2rem',
  },
  input: {
    marginTop: theme.spacing(4),
  },
  autocomplete: {
    width: 360,
  },
  datePicker: {
    width: '100px !important',
  },
  pagination: {
    margin: `${theme.spacing(4)}px 0`,
  },
}));

export default useStyles;
