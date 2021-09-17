import useStyles from '../../pages/Booking/useStyles';

export default function CardImage(): JSX.Element {
  const classes = useStyles();
  return <img className={classes.image} src="https://source.unsplash.com/random/500x500" alt="Dog Owner"></img>;
}
