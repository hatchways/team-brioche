import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core';
import Location from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { Profile } from '../../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  profile: Profile;
}
export default function ProfileCard({ profile }: Props): JSX.Element {
  const classes = useStyles();

  const { address, _id: id, profilePic, introduction, pitch, rate, firstName, lastName } = profile;
  return (
    <Card component="article" className={classes.paper} raised>
      <CardActionArea component={Link} to={`/profiles/${id}`}>
        <Box display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={profilePic}
            alt={`${firstName} ${lastName}`}
            className={classes.image}
          ></CardMedia>
        </Box>
        <CardContent className={classes.CardContent}>
          <Typography className={classes.textBold} align="center" variant="h5">
            {firstName} {lastName}
          </Typography>
          <Typography className={classes.introduction} align="center">
            {introduction}
          </Typography>
          <Box className={classes.rating} display="flex" justifyContent="center">
            <Rating name="rating" readOnly value={5} />
          </Box>
          <Typography className={classes.pitch} align="center" variant="subtitle1">
            {pitch}
          </Typography>
          <Box display="flex" justifyContent="space-between" padding="0.5rem" className={classes.footer}>
            <Box display="flex" justifyContent="flex-start" className={classes.addressContainer}>
              <Location color="primary" />
              <Typography className={classes.address}>{address}</Typography>
            </Box>
            <Typography className={classes.textBold} variant="body1">
              ${rate}/hr
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
