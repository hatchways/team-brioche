import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import { User } from '../../interface/User';

interface Props {
  user: User;
}

const ProfileAvatar = ({ user }: Props): JSX.Element => {
  const classes = useStyles();

  return <Avatar alt="Profile Image" src={`https://robohash.org/${user.email}.png`} className={classes.avatar} />;
};

export default ProfileAvatar;
