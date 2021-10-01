import { useState } from 'react';
import { useHistory } from 'react-router';
import { Box, Paper, Typography } from '@material-ui/core';
import Location from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  profile: Profile;
}
export default function ProfileCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const history = useHistory();

  const { address, _id: id, profilePic, introduction, pitch, rate, firstName, lastName } = profile;

  const handleCardSelect = () => history.push(`/profile/${id}`);

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
          <img src={profilePic} className={classes.image} alt={`${firstName} ${lastName}`} />
          <Typography component="figcaption" className={classes.textBold} align="center" variant="h5">
            {firstName} {lastName}
          </Typography>
        </Box>
        <Typography className={classes.introduction} align="center">
          {introduction}
        </Typography>
        <Box className={classes.rating} display="flex" justifyContent="center">
          <Rating name="rating" value={5} />
        </Box>
        <Typography className={classes.pitch} align="center" variant="subtitle1">
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
