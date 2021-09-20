import useStyles from '../../pages/Booking/useStyles';

interface Props {
  nextBooking?: boolean;
}
export default function CardImage({ nextBooking }: Props): JSX.Element {
  const classes = useStyles();
  const getCssClass = () => {
    const baseClass = classes.image;
    const derivedClass = classes.imageNext;
    return nextBooking ? derivedClass : baseClass;
  };
  return <img className={getCssClass()} src="https://source.unsplash.com/random/500x500" alt="Dog Owner"></img>;
}
