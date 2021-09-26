import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';

interface Props {
  loggedInUser: User;
}

const ProfilePhoto = ({ loggedInUser }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.root}>
      <Grid container justify="center">
        <Grid item container lg={4} md={6} xs={11} direction="column" alignItems="center">
          <Typography variant="h4" className={classes.title}>
            Profile Photo
          </Typography>
          <Box className={classes.avatarPanel}>
            <ProfileAvatar user={loggedInUser} />
          </Box>
          <Typography color="secondary" className={classes.description}>
            Be sure to use a photo that clearly shows your face
          </Typography>
          <Box className={classes.upload}>
            <Button variant="outlined" color="primary" fullWidth>
              Upload a file from your device
            </Button>
          </Box>
          <Box>
            <Button color="secondary" size="large" className={classes.delete} startIcon={<DeleteIcon />}>
              Delete Photo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfilePhoto;
