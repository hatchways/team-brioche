import { useEffect } from 'react';
import { Grid, Divider, Typography, Toolbar, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import useStyles from './useStyles';
import { getConversations } from '../../../helpers/APICalls/conversation';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';
import { Profile } from '../../../interface/Profile';
import { Conversation } from '../../../interface/Conversation';
export default function ConvoListDrawer({ conversations, setCurrentConvo }: any): JSX.Element {
  const classes = useStyles();
  const { profileData } = useAuth();
  const { loggedInUser } = useAuth();
  useEffect(() => {
    if (loggedInUser) {
      getConversations().then((conversations) => {
        console.log(conversations);
      });
    }
  }, [loggedInUser]);
  return (
    <div>
      <Toolbar />
      <Typography variant="h5">Inbox Messages</Typography>
      <Divider />
      <List>
        {conversations?.map((conversation: Conversation, index: number) => (
          <ListItem
            button
            onClick={() => {
              setCurrentConvo(conversation);
            }}
            key={conversation._id}
          >
            <Grid container>
              {conversation.members?.map(
                (member: User) =>
                  loggedInUser?.email !== member.email && (
                    <Typography variant="button" key={member._id}>
                      {member.email}
                    </Typography>
                  ),
              )}
              {conversation.lastMessage && <Typography>{conversation.lastMessage.message}</Typography>}
              {conversation.lastMessage && <Typography>{conversation.lastMessage.updatedAt}</Typography>}
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
