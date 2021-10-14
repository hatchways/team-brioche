import { useEffect, useState, SyntheticEvent } from 'react';
import { Grid, Divider, Typography, Avatar, Box, TextField, Button, ThemeProvider } from '@mui/material';
import moment from 'moment';
import useStyles from './useStyles';
import useInputState from '../../../helpers/useInputState';
import Chat from './Chat';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Conversation } from '../../../interface/Conversation';
import { Message } from '../../../interface/Message';
import { Profile } from '../../../interface/Profile';
import { getMessages, sendMessage } from '../../../helpers/APICalls/message';
import { theme } from '../../../themes/newTheme';
interface Props {
  currentConvo?: Conversation;
  otherUser?: Profile;
}

export default function MessengerApp({ currentConvo, otherUser }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { profileData } = useAuth();
  const [messages, setMessages] = useState<Message[] | undefined>();
  const [text, handleTextChange, reset] = useInputState('');
  const ariaLabel = { 'aria-label': 'Type your Message here' };
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
      getMessages(currentConvo._id).then((messages) => {
        setMessages(messages);
      });
    }
  }, [currentConvo, profileData]);
  return (
    <Box className={classes.messengerApp} sx={{ display: 'flex' }}>
      <Grid container display="flex" alignItems="center" className={classes.headerContainer}>
        <Avatar alt="Contact Profile Pic" src={otherUser?.profilePic} />
        <Typography variant="h6">{otherUser?.firstName}</Typography>
        <Divider />
      </Grid>
      <Grid container sx={{ overflow: 'scroll', position: 'relative', top: '112px', backgroundColor: '#ffffff' }}>
        <Chat messages={messages} otherUser={otherUser} />
      </Grid>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'fixed',
          zIndex: 1,
          width: '78%',
          bottom: '0%',
          backgroundColor: '#ffffff',
          padding: theme.spacing(1),
          boxShadow: '-1px -3px 20px -10px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <ThemeProvider theme={theme}>
          <Divider />
          <TextField
            value={text}
            onChange={handleTextChange}
            inputProps={ariaLabel}
            variant="standard"
            placeholder={`Reply to ${otherUser?.firstName}`}
            sx={{ flexGrow: 1, margin: theme.spacing(1) }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ margin: theme.spacing(1), borderRadius: '0' }}
          >
            Send
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
