import { useState, useEffect, SyntheticEvent } from 'react';
import { Grid, Divider, Typography, Avatar, Box, TextField, Button } from '@mui/material';
import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import MessageList from './MessageList';
import { getMessages, sendMessage } from '../../../helpers/APICalls/messages';
import { User } from '../../../interface/User';
import { Message, SingleConversation } from '../../../interface/Message';
import { Conversation } from '../../../interface/Conversation';
import useInputState from '../../../helpers/useInputState';
interface Props {
  currentConvo: Conversation | null;
}
export default function MessengerApp({ currentConvo }: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, handleChange, reset] = useInputState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(currentConvo?._id, message);
    reset();
  };
  useEffect(() => {
    if (currentConvo) {
      getMessages(currentConvo._id).then((messages: Message[]) => {
        setMessages(messages);
      });
    }
  }, [currentConvo]);
  return currentConvo ? (
    <Box className={classes.messengerApp} sx={{ display: 'flex' }}>
      <Grid container>
        <Avatar alt="Contact Profile Pic" />
        {currentConvo.members?.map(
          (member: User) =>
            loggedInUser?.email !== member.email && <Typography variant="h6">{member.email}</Typography>,
        )}
        <Divider />
      </Grid>
      <Grid>
        <MessageList messages={messages} />
      </Grid>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Reply" value={message} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  ) : (
    <Grid container></Grid>
  );
}
