import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { DropzoneDialog } from 'material-ui-dropzone';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import profilePhoto from '../../helpers/APICalls/profilePhoto';
import deleteProfilePhoto from '../../helpers/APICalls/deleteProfilePhoto';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { useSnackBar } from '../../context/useSnackbarContext';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from '@material-ui/core';
import { ProfileResponse } from '../../interface/ProfileResponse';

interface Props {
  loggedInUser: User;
  profile: ProfileResponse;
  setProfile: (nextProfile: ProfileResponse) => void;
}

const ProfilePhoto = ({ loggedInUser, profile, setProfile }: Props): JSX.Element => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteOpen = () => setCheckDelete(true);
  const handleDeleteClose = () => setCheckDelete(false);

  const onSave = (photos: File[]) => {
    const formData = new FormData();
    photos.forEach((photo: File) => {
      formData.append('photos', photo, photo.name);
    });
    setIsUploading(true);
    setOpen(false);
    profilePhoto(formData).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setProfile({ ...profile, profilePic: data.success.profilePic });
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
      setIsUploading(false);
    });
  };

  const onDelete = () => {
    setIsUploading(true);
    setCheckDelete(false);
    deleteProfilePhoto().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setProfile({ ...profile, profilePic: '' });
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
      setIsUploading(false);
    });
  };

  return (
    <Paper elevation={5} className={classes.root}>
      <Grid container justify="center">
        <Grid item container lg={4} md={6} xs={11} direction="column" alignItems="center">
          <Typography variant="h4" className={classes.title}>
            Profile Photo
          </Typography>
          <Box className={classes.avatarPanel}>
            <ProfileAvatar user={loggedInUser} profilePic={profile.profilePic} />
          </Box>
          <Typography color="secondary" className={classes.description}>
            Be sure to use a photo that clearly shows your face
          </Typography>
          <Box className={classes.upload}>
            <Button variant="outlined" color="primary" fullWidth onClick={handleOpen}>
              Upload a file from your device
            </Button>
            <DropzoneDialog
              open={open}
              onSave={onSave}
              acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
              showPreviews={true}
              maxFileSize={50000000}
              filesLimit={1}
              onClose={handleClose}
            />
          </Box>
          <Box>
            <Button
              color="secondary"
              size="large"
              className={classes.delete}
              startIcon={<DeleteIcon />}
              onClick={handleDeleteOpen}
              disabled={profile.profilePic === ''}
            >
              Delete Photo
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal open={isUploading}>
        <Box className={classes.progress}>
          <CircularProgress color="primary" />
        </Box>
      </Modal>
      <Dialog
        open={checkDelete}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {'Do you really want to delete this profile photo?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" size="large" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button color="primary" size="large" onClick={onDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProfilePhoto;
