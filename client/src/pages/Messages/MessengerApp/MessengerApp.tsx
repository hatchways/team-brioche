import { useEffect, useState, SyntheticEvent } from 'react';
import { Grid, Divider, Typography, Avatar, Box, TextField, Button } from '@mui/material';
import useStyles from './useStyles';
import useInputState from '../../../helpers/useInputState';
import Chat from './Chat';

import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Conversation } from '../../../interface/Conversation';
import { Message } from '../../../interface/Message';
import { Profile } from '../../../interface/Profile';
import { getMessages, sendMessage } from '../../../helpers/APICalls/message';
interface Props {
  currentConvo?: Conversation;
}

export default function MessengerApp({ currentConvo }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { profileData } = useAuth();
  const [messages, setMessages] = useState<Message[] | undefined>();
  const [otherUser, setOtherUser] = useState<Profile | undefined>();
  const [text, handleTextChange, reset] = useInputState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    currentConvo &&
      sendMessage(currentConvo._id, text).then((data) => {
        if (!data.messageSent) {
          updateSnackBarMessage('Something went wrong. Please refresh the page and try again');
          reset();
        } else {
          updateSnackBarMessage('Message Sent');
          reset();
        }
      });
  };
  useEffect(() => {
    if (currentConvo) {
      currentConvo.members.map((profile) => {
        if (profile._id !== profileData?._id) {
          setOtherUser(profile);
        }
      });
      getMessages(currentConvo._id).then((messages) => {
        setMessages(messages);
      });
    }
  }, [currentConvo, profileData]);
  return (
    <Box className={classes.messengerApp} sx={{ display: 'flex' }}>
      <Grid container>
        <Avatar alt="Contact Profile Pic" src={otherUser?.profilePic} />
        <Typography variant="h6">{otherUser?.firstName}</Typography>
        <Divider />
      </Grid>
      <Grid>
        <Chat messages={messages} otherUser={otherUser} />
      </Grid>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Reply" value={text} onChange={handleTextChange} />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
}
