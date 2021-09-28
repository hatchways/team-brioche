import { useState } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import Location from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';
// TODO: see comment below
// import { useHistory } from 'react-router';

interface Props {
  profile: Profile;
}
export default function ProfileCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  // const history = useHistory();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const { address, _id: id, profilePic, introduction, pitch, rate, firstName, lastName } = profile;

  const handleCardSelect = () => {
    // TODO: redirect to profile details page
    // history.push('/path to Profile details  page')
  };

  return (
    <Paper
      component="article"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
      onDoubleClick={handleCardSelect}
      className={classes.paper}
      key={id}
      elevation={isMouseOver ? 20 : 5}
    >
      <Box className={classes.cardBody}>
        <Box
          component="figure"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          className={classes.imageContainer}
        >
          <img src={profilePic} className={classes.image} alt="profile name" />
          <Typography component="figcaption" className={classes.textBold} align="center" variant="h4">
            {firstName} {lastName}
          </Typography>
        </Box>
        <Typography className={classes.introduction} align="center">
          {introduction}
        </Typography>
        <Box marginBottom="1rem" marginTop="1rem" display="flex" justifyContent="center">
          {/* The ratings control logic is yet to be developed */}
          <Rating name="rating" value={5} />
        </Box>
        <Typography className={classes.textBold} align="center" variant="subtitle1">
          {pitch}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="0.5rem" className={classes.footer}>
        <Box display="flex" justifyContent="flex-start" className={classes.addressContainer}>
          <Location color="primary" />
          <Typography className={classes.address}>{address}</Typography>
        </Box>
        <Typography className={classes.textBold} variant="body1">
          ${rate}/hr
        </Typography>
      </Box>
    </Paper>
  );
}
