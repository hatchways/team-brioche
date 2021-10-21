import { FormEventHandler, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Rating } from '@mui/material';
import { Box, Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { BookingRequest } from '../../../interface/BookingApiData';
import { displayDateTime } from '../../../helpers/dateTimeHelper';
import SelectBooking from '../SelectBooking/SelectBooking';
import { useAuth } from '../../../context/useAuthContext';
import { CreateReview, StarRating } from '../../../interface/Review';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { createUpdateReviews } from '../../../helpers/APICalls/reviews';
import useStyles from './useStyle';

interface Props {
  booking: BookingRequest;
  isUpcoming?: boolean;
}

export default function BookingCard({ booking, isUpcoming }: Props): JSX.Element {
  const {
    _id: bookingRequestId,
    accepted: isRequestAccepted,
    declined: isRequestDeclined,
    start,
    end,
    ownerId: petOwner,
    sitterId: petSitter,
    reviewId: intialReview,
  } = booking;

  const [review, setReview] = useState(intialReview);
  const [rating, setRating] = useState<StarRating | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const [comment, setComment] = useState('');
  const { updateSnackBarMessage } = useSnackBar();
  const { profileData: loggedInUserProfile } = useAuth();
  const classes = useStyles();

  const getLabel = () => {
    if (isRequestAccepted) return 'Accepted';
    if (isRequestDeclined) return 'Declined';
    return 'Pending';
  };

  const isPetOwner = petOwner._id === loggedInUserProfile?._id;

  const handleRatingChange = (rating: number | null) => {
    if (rating) {
      setRating(rating as StarRating);
    }
  };

  const handleRatingSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const review: CreateReview = {
      reviewee: petSitter._id as string,
    };

    if (comment) review.comment = comment;
    if (rating) review.starRating = rating as StarRating;

    setSubmitting(true);
    createUpdateReviews(review, bookingRequestId)
      .then((data) => {
        setReview(data);
        setSubmitting(false);
        setUpdateReview(false);
        updateSnackBarMessage('Review submitted');
      })
      .catch(() => {
        setSubmitting(false);
        setUpdateReview(false);
        updateSnackBarMessage('Review could not be submitted please try again later');
      });
  };
  return (
    <Box className={clsx(classes.bookingCardContainer, isUpcoming && classes.removeBorder)}>
      <Grid container direction="row" justifyContent="space-between">
        <Box>
          <Box>
            <Typography
              variant="h6"
              className={clsx(classes.label, classes.padbottom, isUpcoming && classes.upComingDateLabel)}
            >
              {displayDateTime(start, end)}
            </Typography>
            <Grid container alignItems="center">
              <img
                className={clsx(classes.image, isUpcoming && classes.imageNext)}
                src="https://source.unsplash.com/random/500x500"
                alt={isPetOwner ? 'Pet sitter' : 'Pet owner'}
              ></img>
              {isPetOwner ? (
                <Link to={`/profiles/${petSitter._id}`} className={classes.linkText}>
                  <Typography
                    variant="h6"
                    className={clsx(classes.label, classes.padLeft, isUpcoming && classes.upComingDateLabel)}
                  >
                    Pet sitter: {petSitter.firstName} {petSitter.lastName}
                  </Typography>
                </Link>
              ) : (
                <Link to={`/profiles/${petOwner._id}`} className={classes.linkText}>
                  <Typography
                    variant="h6"
                    className={clsx(classes.label, classes.padLeft, isUpcoming && classes.upComingDateLabel)}
                  >
                    Pet Owner: {petOwner.firstName} {petOwner.lastName}
                  </Typography>
                </Link>
              )}
            </Grid>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="end">
          {!isUpcoming && <SelectBooking id={bookingRequestId} booking={booking} />}
          <Typography variant="h6" className={clsx(classes.label, classes.labelStatus)}>
            {getLabel()}
          </Typography>
        </Box>
      </Grid>
      {isRequestAccepted && isPetOwner && (
        <Fragment>
          {updateReview ? (
            <form onSubmit={handleRatingSubmit}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Rating value={rating} onChange={(event, newRating) => handleRatingChange(newRating)} />
                <TextField
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  label="comments"
                  variant="outlined"
                  placeholder="comments"
                />
                {submitting ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" size="small" variant="outlined" color="primary">
                    Submit review
                  </Button>
                )}
              </Grid>
            </form>
          ) : (
            <Fragment>
              <Box display="flex" alignItems="center" style={{ margin: '1rem 0' }}>
                <Rating value={review?.starRating} readOnly style={{ marginRight: '1rem' }} />
                <Typography variant="subtitle1">{review?.comment}</Typography>
              </Box>
              <Button color="primary" variant="outlined" size="small" onClick={() => setUpdateReview(true)}>
                Add/Update Review
              </Button>
            </Fragment>
          )}
        </Fragment>
      )}
    </Box>
  );
}
