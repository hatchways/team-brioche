import { ChangeEvent, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
}

const ProfilePhoto = ({ loggedInUser }: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const classes = useStyles();

  // React.FormEvent<FormControl & FormControlProps>)
  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Paper elevation={5} className={classes.root}>
      <Grid container justify="center">
        <Grid item container lg={4} md={6} xs={11} direction="column" alignItems="center">
          <Box className={classes.title}>
            <Typography variant="h4">Profile Photo</Typography>
          </Box>
          <Box className={classes.avatarPanel}>
            <ProfileAvatar user={loggedInUser} />
          </Box>
          <Box className={classes.description}>
            <Typography color="secondary">Be sure to use a photo that clearly shows your face</Typography>
          </Box>
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
