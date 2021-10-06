import { useState, SyntheticEvent } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';

import useStyles from './useStyles';
import links from './ProfileSettingsLinks';

export default function ProfileSkeleton(): JSX.Element {
  const classes = useStyles();
  const { location } = useHistory();
  const [element, setElement] = useState<(EventTarget & Element) | null>(null);
  const isMenuOpen = Boolean(element);

  const handleMenuClick = (event: SyntheticEvent) => {
    setElement(event.currentTarget);
  };
  const handleMenuClose = () => {
    setElement(null);
  };

  const basePath = '/profile-settings';

  const isLinkActive = (path: string): boolean => {
    if (location.pathname === `${basePath}${path}`) return true;
    return false;
  };

  return (
    <Grid container className={classes.root}>
      <Box component="nav" className={classes.nav}>
        {links.map((link) => (
          <Link className={classes.link} key={link.name} to={`${basePath}${link.path}`}>
            <Typography align="left" className={clsx(classes.linkText, isLinkActive(link.path) && classes.active)}>
              {link.name}
            </Typography>
          </Link>
        ))}
      </Box>
      <Box component="section" className={classes.section}>
        {/* Hamburger menu button */}
        <Box className={classes.menu}>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={handleMenuClick}
            size="large"
          >
            <MenuIcon color="primary" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={element}
            open={isMenuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {links.map((link) => (
              <MenuItem key={link.name} onClick={handleMenuClose}>
                <Link className={classes.link} to={`${basePath}${link.path}`}>
                  <Typography className={clsx(classes.linkText, isLinkActive(link.path) && classes.active)}>
                    {link.name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box>
          <Switch>
            {links.map((link) => (
              <Route key={link.name} exact path={`${basePath}${link.path}`} render={() => link.component} />
            ))}
          </Switch>
        </Box>
      </Box>
    </Grid>
  );
}
