import {
  Grid,
  Divider,
  Typography,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import useStyles from './useStyles';
import { Message } from '../../../interface/Message';
import { Profile } from '../../../interface/Profile';
import { theme } from '../../../themes/newTheme';
interface Props {
  messages: Message[] | undefined;
  otherUser?: Profile;
}
export default function Chat({ messages, otherUser }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <List sx={{ paddingBottom: '10%' }} className={classes.chatBox}>
      {messages?.map((message: Message) =>
        message.senderId?._id !== otherUser?._id ? (
          <ListItem sx={{ textAlign: 'right', alignSelf: 'flex-end', maxWidth: '540px' }} key={message._id}>
            <ListItemText className={`${classes.rightText} ${classes.text}`}>{message.message}</ListItemText>
          </ListItem>
        ) : (
          <ListItem sx={{ textAlign: 'left', alignSelf: 'flex-start', maxWidth: '540px' }} key={message._id}>
            <ListItemAvatar>
              <Avatar src={otherUser?.profilePic} />
            </ListItemAvatar>
            <ListItemText className={`${classes.leftText} ${classes.text}`}>{message.message}</ListItemText>
          </ListItem>
        ),
      )}
    </List>
  );
}
