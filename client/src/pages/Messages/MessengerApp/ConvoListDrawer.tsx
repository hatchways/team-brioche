import { Divider, Typography, Toolbar, List } from '@mui/material';
import useStyles from './useStyles';
import { Conversation } from '../../../interface/Conversation';
import Convo from './Convo';
import { theme } from '../../../themes/newTheme';
interface Props {
  conversations?: Conversation[];
  setCurrentConvo?: any;
}
export default function ConvoListDrawer({ conversations, setCurrentConvo }: Props): JSX.Element {
  return (
    <div>
      <Toolbar />
      <Typography variant="h5" sx={{ marginLeft: theme.spacing(3), marginBottom: theme.spacing(3) }}>
        Inbox Messages
      </Typography>
      <Divider />
      <List>
        {conversations?.map((conversation: Conversation) => (
          <Convo key={conversation._id} setCurrentConvo={setCurrentConvo} conversation={conversation} />
        ))}
      </List>
    </div>
  );
}
