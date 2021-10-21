import { Fragment } from 'react';
import { Review } from '../../interface/Review';
import { List, Rating, ListItem, Divider, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import useStyles from './useStyles';

interface Props {
  reviews: Review[];
}
export default function Reviews({ reviews }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <List>
      {reviews.map((review) => {
        const { reviewer, starRating, comment } = review;
        return (
          <Fragment key={review._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`${reviewer.firstName} ${reviewer.lastName}`} src={reviewer.profilePic} />
              </ListItemAvatar>
              <ListItemText
                primary={`${reviewer.firstName} ${reviewer.lastName}`}
                secondary={
                  <Fragment>
                    <span className={classes.listItemText}>{comment}</span>
                    <Rating value={starRating} readOnly />
                  </Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
  );
}
