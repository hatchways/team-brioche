import clsx from 'clsx';
import useStyles from './useStyle';

interface Props {
  isUpcoming?: boolean;
}

export default function CardImage({ isUpcoming }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <img
      className={clsx(classes.image, isUpcoming && classes.imageNext)}
      src="https://source.unsplash.com/random/500x500"
      alt="Dog Owner"
    ></img>
  );
}
