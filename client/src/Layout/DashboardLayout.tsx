import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Link, Avatar, Badge, Menu, MenuItem, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import Logo from '../assets/img/logo.png';
import { useAuth } from '../context/useAuthContext';

interface Props {
  component: React.ReactNode;
}

function DashboardLayout({ component }: Props): JSX.Element {
  const classes = useStyles();
  const [profileEl, setProfileEl] = useState<null | HTMLElement>(null);

  const { loggedInUser, logout } = useAuth();

  const handleLogout = () => {
    setProfileEl(null);
    logout();
  };

  return (
    <Box className={classes.root}>
      <AppBar position="relative" color="inherit" elevation={6}>
        <Toolbar>
          <Box className={classes.logo}>
            <img src={Logo} />
          </Box>
          {!loggedInUser ? (
            <Box className={classes.wrapper}>
              <Link href="#" color="inherit" className={classes.member}>
                BECOME A SITTER
              </Link>
              <Button href="/login" variant="outlined" color="primary" className={classes.link}>
                LOGIN
              </Button>
              <Button href="/signup" variant="contained" color="primary" className={classes.link}>
                SIGN UP
              </Button>
            </Box>
          ) : (
            <Box className={classes.wrapper}>
              <Badge variant="dot" invisible={false} className={classes.badge}>
                <Box component="div" className={classes.tooltipButton}>
                  Notifications
                </Box>
              </Badge>
              <Badge variant="dot" invisible={false} className={classes.badge}>
                <Box component="div" className={classes.tooltipButton}>
                  My Jobs
                </Box>
              </Badge>
              <Badge variant="dot" color="primary" invisible={false} className={classes.badge}>
                <Box component="div" className={classes.tooltipButton}>
                  Messages
                </Box>
              </Badge>
              <Box>
                <IconButton
                  id="profile-button"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  aria-expanded={Boolean(profileEl) ? 'true' : undefined}
                  onClick={(evt) => {
                    setProfileEl(evt.currentTarget);
                  }}
                  className={classes.avatar}
                >
                  <Avatar
                    alt="Profile Image"
                    src={loggedInUser.profilePic || `https://robohash.org/${loggedInUser.email}.png`}
                  />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={profileEl}
                  open={Boolean(profileEl)}
                  onClose={() => {
                    setProfileEl(null);
                  }}
                  keepMounted
                  MenuListProps={{ 'aria-labelledby': 'profile-button' }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  getContentAnchorEl={null}
                >
                  <MenuItem>My Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {component}
    </Box>
  );
}

export default DashboardLayout;
