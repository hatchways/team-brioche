import useStyles from './useStyle';

interface Props {
  nextBooking?: boolean;
}

export default function CardImage({ nextBooking }: Props): JSX.Element {
  const classes = useStyles();
  const getCssClass = () => {
    const upcoming = classes.image;
    const bookingGroup = classes.imageNext;
    return nextBooking ? bookingGroup : upcoming;
  };
  return <img className={getCssClass()} src="https://source.unsplash.com/random/500x500" alt="Dog Owner"></img>;
}
