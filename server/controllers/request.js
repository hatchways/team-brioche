const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const Profile = require("../models/Profile");
const { createPaymentIntent } = require("../utils/paymentHelper");

// @route GET /request
// @desc gets all requests for loged-in dog sitter
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const profile = await Profile.findOne({ userId: id });
  const requests = await Request.find({
    $or: [{ ownerId: profile._id }, { sitterId: profile._id }],
  })
    .populate("ownerId", { firstName: 1, lastName: 1 })
    .populate("sitterId", { firstName: 1, lastName: 1 });

  if (!requests.length) {
    res.status(404);
    throw new Error("No Request found for this user");
  }

  res.status(200).send(requests);
});

// @route POST /request
// @desc dog-owner Create request for dog-sitters
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  let { sitterProfileId, ownerProfileId, dropInDate, pickUpDate } = req.body;

  dropInDate = new Date(dropInDate);
  pickUpDate = new Date(pickUpDate);

  if (isNaN(dropInDate.getTime()) || isNaN(pickUpDate.getTime())) {
    res.status(400);
    throw new Error("Invalid start or end date");
  }

  // make sure the end date is always ahead of the start date
  if (dropInDate.getTime() > pickUpDate.getTime()) {
    res.status(400);
    throw new Error("End time must be ahead of the start time");
  }

  // make sure not to save the same request more than once
  const checkRequest = await Request.findOne({
    ownerId: ownerProfileId,
    sitterId: sitterProfileId,
    start: dropInDate,
    end: pickUpDate,
  });
  if (checkRequest) {
    res.status(400);
    throw new Error("this Request has already been saved");
  }

  const [dogOwnerProfile, dogSitterProfile] = await Promise.all([
    Profile.findOne({ _id: ownerProfileId }),
    Profile.findOne({ _id: sitterProfileId }),
  ]);

  // This check is added here because "rate" is not required in the profile model and may be undefined
  if (!dogSitterProfile || !dogSitterProfile.rate) {
    res.status(400);
    throw new Error("Incomplete sitter Profile");
  }

  if (!dogOwnerProfile.customerId) {
    res.status(400);
    throw new Error(
      "Please add a payment method to your profile before making a request"
    );
  }

  const paymentIntent = await createPaymentIntent(
    dogSitterProfile,
    dogOwnerProfile,
    dropInDate,
    pickUpDate
  );

  if (!paymentIntent) {
    res.status(500);
    throw new Error(
      "Could not create a payment intent. Please try again later"
    );
  }

  const request = await Request.create({
    ownerId: ownerProfileId,
    sitterId: sitterProfileId,
    start: dropInDate,
    end: pickUpDate,
    paymentIntentId: paymentIntent.id,
  });

  if (!request) {
    res.status(500);
    throw new Error(
      "Something went wrong with your request please try again later"
    );
  }

  res.status(200).send(request);
});

// @route PATCH /request/:id
// @desc dog-sitter update approved/decline an existing Request
// @access Private
exports.updateRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;
  const { accepted, declined } = req.body;

  if (!mongoose.isValidObjectId(requestId)) {
    res.status(400);
    throw new Error("Invalid Reqeust Id");
  }

  let request = await Request.findById(requestId)
    .populate("ownerId", { firstName: 1, lastName: 1 })
    .populate("sitterId", { firstName: 1, lastName: 1 });

  if (!request) {
    res.status(404);
    throw new Error("No Request found");
  }

  let intent;
  if (declined) {
    intent = await stripe.paymentIntents.cancel(request.paymentIntentId);
    request.set({
      accepted: false,
      declined: true,
    });
  }

  if (accepted) {
    intent = await stripe.paymentIntents.confirm(request.paymentIntentId);

    if (intent.status !== "succeeded") {
      res.status(402);
      throw new Error("Notify customer to update payment method and try again");
    }
    request.set({
      accepted: true,
      declined: false,
    });
  }

  request = await request.save();

  res.status(200).json(request);
});
