import { Toolbar, Divider, Typography, Avatar, Box, Drawer, ListItem, ListItemText } from '@mui/material';
import useStyles from './useStyles';

export default function MessengerApp(): JSX.Element {
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar alt="Contact Profile Pic" />
      <Typography variant="h6">John Doe</Typography>
    </Box>
  );
}
