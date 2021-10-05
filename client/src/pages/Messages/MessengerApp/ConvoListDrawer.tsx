import { useEffect, useState } from 'react';
import { Grid, Divider, Typography, Toolbar, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import useStyles from './useStyles';
import { Conversation, ConversationList } from '../../../interface/Conversation';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';
export default function ConvoListDrawer({ conversations, setCurrentConvo }: any): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

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
                    <Typography variant="button" key={member.email}>
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
