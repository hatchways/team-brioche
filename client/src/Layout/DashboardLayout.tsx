import React, { useState, FunctionComponent } from 'react';
import { Box, AppBar, Toolbar, Button, Avatar, Badge, Menu, MenuItem, IconButton } from '@material-ui/core';
import { useAuth } from '../context/useAuthContext';
import useStyles from './useStyles';

import Logo from '../assets/img/logo.png';

const DashboardLayout: FunctionComponent = ({ children }): JSX.Element => {
  const classes = useStyles();
  const [profileEl, setProfileEl] = useState<null | HTMLElement>(null);

  const { loggedInUser, logout } = useAuth();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/home';

  const handleLogout = () => {
    setProfileEl(null);
    logout();
  };

  return (
    <Box className={classes.root}>
      <AppBar position="sticky" color="inherit" elevation={6} className={clsx(isHomePage && classes.HomePage)}>
        <Toolbar>
          <Box className={classes.logo}>
            <img src={Logo} alt="Logo Image" />
          </Box>
          {!loggedInUser ? (
            <Box className={classes.wrapper}>
              <Button
                component={Link}
                to={'#'}
                color="inherit"
                className={clsx(classes.member, isHomePage && classes.textWhite)}
              >
                Become a sitter
              </Button>
              <Button
                component={Link}
                to={'/login'}
                variant="outlined"
                color="primary"
                className={clsx(classes.link, isHomePage && classes.textWhite)}
              >
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
      {children}
    </Box>
  );
};

export default DashboardLayout;
