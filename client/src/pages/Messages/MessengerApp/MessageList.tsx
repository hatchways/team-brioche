import { Grid, Divider, Typography, Avatar, Box, Drawer, ListItem, ListItemText } from '@mui/material';
import { Message } from '../../../interface/Message';
import useStyles from './useStyles';
interface Props {
  messages: Message[];
}
export default function Conversation({ messages }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      {messages.map((message: any) => (
        <Typography key={message.id}>{message.message}</Typography>
      ))}
    </Box>
  );
}
