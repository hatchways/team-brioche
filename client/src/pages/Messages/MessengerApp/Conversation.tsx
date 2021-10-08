import { Grid, Divider, Typography, Avatar, Box, Drawer, ListItem, ListItemText } from '@mui/material';
import useStyles from './useStyles';

export default function Conversation(): JSX.Element {
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h4">Conversation</Typography>
    </Box>
  );
}
