import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'rgb(0,0,0)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    width: '400px',
    maxWidth: '400px',
    padding: '5px',
  },
  availLabel: {
    position: 'relative',
    top: '-12px',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  container: {
    maxWidth: '550px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderControl: {
    width: '58%',
    input: {
      minHeight: '2rem',
    },
    margin: theme.spacing(2),
  },
  genderLabel: {
    color: 'white',
  },
  select: {
    marginLeft: '51px',
    minWidth: '160px',
  },
  availability: {
    minWidth: '410px',
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
  },
}));

export default useStyles;
