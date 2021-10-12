import { useEffect, useState } from 'react';
import { Avatar, ListItem, Grid, Typography } from '@mui/material';
import { Profile } from '../../../interface/Profile';
import { useAuth } from '../../../context/useAuthContext';
import { theme } from '../../../themes/newTheme';
import moment from 'moment';
export default function Convo({ conversation, setCurrentConvo }: any): JSX.Element {
  const format = {
    sameDay: 'hh:mmA',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY',
  };
  const { profileData } = useAuth();
  const [otherUser, setOtherUser] = useState<Profile | undefined>();
  useEffect(() => {
    if (conversation) {
      conversation.members.map((member: Profile) => {
        profileData?._id !== member._id && setOtherUser(member);
      });
    }
  }, [conversation, profileData]);
  return (
    <ListItem
      button
      onClick={() => {
        setCurrentConvo(conversation);
      }}
      key={conversation._id}
    >
      <Grid container display="flex" direction="row" sx={{ justifyContent: 'space-around' }}>
        <Avatar src={otherUser?.profilePic} sx={{ width: 56, height: 56 }} />
        <Grid item display="flex" direction="column" sx={{ flexGrow: 1, margin: `0 ${theme.spacing(1)}` }}>
          <Typography variant="button">{otherUser?.firstName}</Typography>
          {conversation.lastMessage && <Typography>{conversation.lastMessage.message}</Typography>}
        </Grid>
        {conversation.lastMessage && (
          <Typography>{moment(conversation.lastMessage.updatedAt).calendar(null, format)}</Typography>
        )}
      </Grid>
    </ListItem>
  );
}
