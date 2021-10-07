import { useEffect, useState } from 'react';
import { Grid, Divider, Typography, Toolbar, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import useStyles from './useStyles';
import { Conversation, ConversationList } from '../../../interface/Conversation';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';
import { Profile } from '../../../interface/Profile';
export default function ConvoListDrawer({ conversations, setCurrentConvo }: any): JSX.Element {
  const classes = useStyles();
  const { profileData } = useAuth();

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
                (member: Profile) =>
                  profileData?.firstName !== member.firstName && (
                    <Typography variant="button" key={member._id}>
                      {member.firstName}
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
