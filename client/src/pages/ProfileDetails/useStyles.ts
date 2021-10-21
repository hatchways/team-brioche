import { makeStyles } from '@material-ui/core/styles';
// 1250px
const custombreakPoint = 1250;
const useStyles = makeStyles((theme) => ({
  profileContainer: {
    margin: theme.spacing(4),
    height: '900px',
    maxWidth: '760px',
  },
  coverImage: {
    maxHeight: '260px',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  basicInfoContainer: {
    position: 'relative',
    bottom: '94px',
  },
  profilePic: {
    borderRadius: '50%',
    maxWidth: '180px',
    height: '180px',
    width: 'auto',
    border: '2px solid white',
    boxShadow: '-1px 9px 11px -5px rgb(0 0 0 / 35%)',
  },
  locationIcon: {
    position: 'relative',
    top: '5px',
  },
  aboutContainer: {
    margin: theme.spacing(4),
    position: 'relative',
    bottom: '90px',
  },
  description: {
    maxWidth: '680px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  galleryContainer: {
    flexDirection: 'row',
  },
  galleryPic: {
    margin: theme.spacing(1),
    height: '180px',
    width: '180px',
  },
  bookingAndReview: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 6rem',
    width: '40%',
    flexWrap: 'wrap',
    [theme.breakpoints.down(custombreakPoint)]: {
      width: '100%',
      justifyContent: 'space-around',
      padding: '0 1rem',
    },
  },
  bookingContainer: {
    margin: `${theme.spacing(4)}px 0`,
    padding: '2rem 3rem',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reviewContainer: {
    margin: `${theme.spacing(4)}px 0`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.text.secondary,
    height: 'min-content',
    width: '400px',
    maxHeight: '20rem',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '300px',
    },
  },
}));

export default useStyles;
