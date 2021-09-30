import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Avatar, Badge, Menu, MenuItem, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
      <AppBar position="sticky" color="inherit" elevation={6}>
        <Toolbar>
          <Box className={classes.logo}>
            <img src={Logo} alt="Logo Image" />
          </Box>
          {!loggedInUser ? (
            <Box className={classes.wrapper}>
              <Button component={Link} to={'#'} color="inherit" className={classes.member}>
                Become a sitter
              </Button>
              <Button component={Link} to={'/login'} variant="outlined" color="primary" className={classes.link}>
                Login
              </Button>
              <Button component={Link} to={'/signup'} variant="contained" color="primary" className={classes.link}>
                Sign up
              </Button>
            </Box>
          ) : (
            <Box className={classes.wrapper}>
              <Badge variant="dot" invisible={false} className={classes.badge}>
                <Box className={classes.tooltipButton}>Notifications</Box>
              </Badge>
              <Badge variant="dot" invisible={false} className={classes.badge}>
                <Box className={classes.tooltipButton}>My Jobs</Box>
              </Badge>
              <Badge variant="dot" color="primary" invisible={false} className={classes.badge}>
                <Box className={classes.tooltipButton}>Messages</Box>
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
                  <MenuItem component={Link} to={'/profile'}>
                    My Profile
                  </MenuItem>
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
