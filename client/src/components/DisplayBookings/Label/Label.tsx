import { Typography } from '@material-ui/core';
import useStyles from './useStyle';

type textType = 'heading' | 'date' | 'name' | 'status';
interface Props {
  type: textType;
}

const Label: React.FunctionComponent<Props> = ({ children, type }): JSX.Element => {
  const classes = useStyles();
  let cssClass: string;
  switch (type) {
    case 'heading':
      cssClass = classes.heading;
      break;
    case 'date':
      cssClass = classes.date;
      break;
    case 'name':
      cssClass = classes.name;
      break;
    case 'status':
      cssClass = classes.status;
      break;
  }
  return (
    <Typography variant="subtitle2" className={cssClass}>
      {children}
    </Typography>
  );
};

export default Label;
