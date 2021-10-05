import { useState, useEffect } from 'react';
import { Toolbar, Divider, Typography, List, Box, Drawer, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import { theme } from '../../themes/theme';
import MessengerApp from './MessengerApp/MessengerApp';
import ConvoListDrawer from './MessengerApp/ConvoListDrawer';
import { getConversations } from '../../helpers/APICalls/conversation';
import { Conversation, ConversationList } from '../../interface/Conversation';
import { getMessages } from '../../helpers/APICalls/messages';

const drawerWidth = 320;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
export default function Messenger(props: Props): JSX.Element {
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentConvo, setCurrentConvo] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<ConversationList | null>(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { loggedInUser } = useAuth();
  useEffect(() => {
    if (loggedInUser) {
      getConversations().then((conversations) => {
        console.log(conversations);
        return setConversations(conversations);
      });
    }
  }, [loggedInUser]);
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="conversations">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <ConvoListDrawer conversations={conversations} setCurrentConvo={setCurrentConvo} />
        </Drawer>
        <Drawer
          variant="permanent"
          className={classes.drawerRoot}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: theme.spacing(14) },
          }}
          open
        >
          <ConvoListDrawer conversations={conversations} setCurrentConvo={setCurrentConvo} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <MessengerApp currentConvo={currentConvo} />
      </Box>
    </Box>
  );
}
