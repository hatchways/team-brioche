import { useEffect } from 'react';
import { Grid, Divider, Typography, Toolbar, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import useStyles from './useStyles';
import { getConversations } from '../../../helpers/APICalls/conversation';
import { useAuth } from '../../../context/useAuthContext';
export default function ConvoListDrawer(): JSX.Element {
  const classes = useStyles();
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
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
