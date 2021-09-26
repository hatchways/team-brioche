import { useState, SyntheticEvent } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import links from './ProfleLInks';
import useStyles from './useStyles';

export default function ProfileSkeleton(): JSX.Element {
  const classes = useStyles();
  const { location } = useHistory();
  const [element, setElement] = useState<(EventTarget & Element) | null>(null);
  const open = Boolean(element);

  const handleClick = (event: SyntheticEvent) => {
    setElement(event.currentTarget);
  };
  const handleClose = () => {
    setElement(null);
  };

  const isActive = (path: string): boolean => {
    if (location.pathname === `/profile${path}`) return true;
    return false;
  };

  return (
    <Grid container className={classes.root}>
      <Box component="nav" className={classes.nav}>
        {links.map((link) => (
          <Link className={classes.link} key={link.name} to={`/profile${link.path}`}>
            <Typography align="left" className={clsx(classes.linkText, isActive(link.path) && classes.active)}>
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
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="large"
          >
            <MenuIcon color="primary" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={element}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {links.map((link) => (
              <MenuItem key={link.name} onClick={handleClose}>
                <Link className={classes.link} to={`/profile${link.path}`}>
                  <Typography align="left" className={clsx(classes.linkText, isActive(link.path) && classes.active)}>
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
              <Route key={link.name} exact path={`/profile${link.path}`} component={link.component} />
            ))}
          </Switch>
        </Box>
      </Box>
    </Grid>
  );
}
