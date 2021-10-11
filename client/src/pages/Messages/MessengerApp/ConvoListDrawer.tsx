import { Grid, Divider, Typography, Toolbar, List, ListItem } from '@mui/material';
import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { Profile } from '../../../interface/Profile';
import { Conversation, ConversationList } from '../../../interface/Conversation';
interface Props {
  conversations?: Conversation[];
  setCurrentConvo?: any;
}
export default function ConvoListDrawer({ conversations, setCurrentConvo }: Props): JSX.Element {
  const { profileData } = useAuth();
  return (
    <div>
      <Toolbar />
      <Typography variant="h5">Inbox Messages</Typography>
      <Divider />
      <List>
        {conversations?.map((conversation: Conversation) => (
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
