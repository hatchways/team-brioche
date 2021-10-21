const asyncHandler = require("express-async-handler");
const Reviews = require("./../models/Review");
const Request = require("./../models/Request");
const Profile = require("./../models/Profile");
const mongoose = require("mongoose");

exports.getReviews = asyncHandler(async (req, res) => {
  const { profileId } = req.params;

  if (!mongoose.isValidObjectId(profileId)) {
    res.status(400);
    throw new Error("Invalid profile ID");
  }

  const profile = await Profile.findById(profileId);

  if (!profile) {
    res.status(404);
    throw new Error("No profile found for this ID");
  }

  const reviews = await Reviews.find({ reviewee: profileId })
    .sort({ createdAt: -1 })
    .populate("reviewer", {
      firstName: 1,
      lastName: 1,
      profilePic: 1,
    });
  res.status(200).send(reviews);
});

exports.createUpdateReviews = asyncHandler(async (req, res) => {
  const { id: reviewerUserId } = req.user;
  const { requestId } = req.params;
  const { reviewee, comment, starRating } = req.body;

  if (!mongoose.isValidObjectId(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
  }

  // const reviewerProfile = await Profile.findOne({ userId: id });
  // let revieweeProfile = await Profile.findById(reviewee);

  let [reviewerProfile, revieweeProfile, review] = await Promise.all([
    Profile.findOne({ userId: reviewerUserId }),
    Profile.findById(reviewee),
    Reviews.findOne({ request: requestId }),
  ]);

  if (!reviewerProfile || !revieweeProfile) {
    res.status(400);
    throw new Error("Please check the Id of the reviewer or the reviewee");
  }

  if (review) {
    const hasNewRating = starRating !== review.starRating;
    const previousStarRating = review.starRating;

    // comment or starRating may not be defined
    review.set({
      comment: comment || review.comment,
      starRating: starRating || review.starRating,
    });

    review = await review.save();

    if (hasNewRating) {
      // recalculate aggregate only when the rating changes
      let { aggregate, totalReviews } = revieweeProfile.reviews;

      aggregate = Math.round(
        (aggregate * totalReviews - previousStarRating + starRating) /
          totalReviews
      );

      revieweeProfile.set({
        reviews: { aggregate, totalReviews },
      });

      await revieweeProfile.save();
    }

    return res.status(200).send(review);
  }

  const validRatings = [1, 2, 3, 4, 5];
  if (validRatings.indexOf(starRating) === -1) {
    res.status(400);
    throw new Error("Invalid Rating");
  }

  review = await Reviews.create({
    request: requestId,
    reviewer: reviewerProfile._id,
    reviewee: reviewee,
    comment,
    starRating,
  });

  let { aggregate, totalReviews } = revieweeProfile.reviews;
  aggregate = Math.round(
    (aggregate * totalReviews + starRating) / ++totalReviews
  );

  revieweeProfile.set({
    reviews: { aggregate, totalReviews },
  });

  try {
    await Promise.all([
      revieweeProfile.save(),
      Request.findByIdAndUpdate(requestId, { reviewId: review._id }),
    ]);
  } catch (error) {
    res.status(500);
    throw new Error(
      "Your review could not be linked properly. Please try again later"
    );
    // TODO: Add logic to periodically remove unlinked reviews
  }

  if (!review) {
    res.status(500);
    throw new Error("Could not create review. Please try again");
  }
  res.status(200).send(review);
});
