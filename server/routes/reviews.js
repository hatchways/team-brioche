const express = require("express");
const router = express.Router();
const { getReviews, createUpdateReviews } = require("./../controllers/reviews");
const { validateReviewBody } = require("./../validate");
const protect = require("../middleware/auth");

router.route("/:profileId").get(protect, getReviews);
router
  .route("/:requestId")
  .post(protect, validateReviewBody, createUpdateReviews);

module.exports = router;
