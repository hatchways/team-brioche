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
    top: '10px',
    right: '20px',
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
    left: '16px',
  },
  select: {
    marginLeft: '24px',
    minWidth: '160px',
    left: '24px',
  },
  availability: {
    minWidth: '410px',
    margin: theme.spacing(2),
    left: '35px',
  },
  phoneContainer: {
    position: 'relative',
    right: '130px',
  },
  addressContainer: {
    position: 'relative',
    left: '7px',
  },
  descContainer: {
    position: 'relative',
    left: '12px',
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
