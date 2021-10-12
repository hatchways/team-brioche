import { Box, Drawer } from '@mui/material';
import { useState, useEffect } from 'react';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { theme } from '../../themes/theme';
import MessengerApp from './MessengerApp/MessengerApp';
import ConvoListDrawer from './MessengerApp/ConvoListDrawer';
import { getConversations } from '../../helpers/APICalls/conversation';
import { Conversation } from '../../interface/Conversation';
import { Profile } from '../../interface/Profile';
const drawerWidth = 320;

export default function Messages(props: any): JSX.Element {
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [convoList, setConvoList] = useState<Conversation[]>();
  const [otherUser, setOtherUser] = useState<Profile | undefined>();
  const [currentConvo, setCurrentConvo] = useState<Conversation>();
  const { profileData } = useAuth();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    if (profileData) {
      getConversations().then((conversations) => {
        return setConvoList(conversations);
      });
    }
  }, [profileData]);
  useEffect(() => {
    if (currentConvo) {
      currentConvo.members.map((profile) => {
        if (profile._id !== profileData?._id) {
          setOtherUser(profile);
        }
      });
    }
  }, [currentConvo, profileData]);

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="conversations">
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
          <ConvoListDrawer conversations={convoList} setCurrentConvo={setCurrentConvo} />
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
          <ConvoListDrawer conversations={convoList} setCurrentConvo={setCurrentConvo} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, alignSelf: 'center' }}>
        <MessengerApp otherUser={otherUser} currentConvo={currentConvo} />
      </Box>
    </Box>
  );
}
