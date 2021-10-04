import { Grid, Divider, Typography, Avatar, Box, TextField, Button } from '@mui/material';
import useStyles from './useStyles';
import Conversation from './Conversation';
export default function MessengerApp(): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.messengerApp} sx={{ display: 'flex' }}>
      <Grid container>
        <Avatar alt="Contact Profile Pic" />
        <Typography variant="h6">John Doe</Typography>
        <Divider />
      </Grid>
      <Grid>
        <Conversation />
      </Grid>
      <Box component="form">
        <TextField label="Reply" />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
}
