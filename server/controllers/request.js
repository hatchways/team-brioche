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
  const requests = await Request.find({
    $or: [{ ownerId: id }, { sitterId: id }],
  })
    .populate("ownerId", { username: 1, email: 1 })
    .populate("sitterId", { username: 1, email: 1 });

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
  const { id: ownerId } = req.user;
  let { sitterId, start, end } = req.body;

  start = new Date(start);
  end = new Date(end);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    res.status(400);
    throw new Error("Invalid start or end date");
  }

  // make sure the end date is always ahead of the start date
  if (end.getTime() <= start.getTime()) {
    res.status(400);
    throw new Error("End time must be ahead of the start time");
  }

  // make sure not to save the same request more than once
  const checkRequest = await Request.findOne({ ownerId, sitterId, start, end });
  if (checkRequest) {
    res.status(400);
    throw new Error("this Request has already been saved");
  }

  const [dogOwnerProfile, dogSitterProfile] = await Promise.all([
    Profile.findOne({ _id: ownerId }),
    Profile.findOne({ userId: sitterId }),
  ]);

  // check is added here because "rate" is not required in the profile model and may be undefined
  if (!dogSitterProfile || !dogSitterProfile.rate)
    return res.status(400).json({ message: "Incomplete sitter Profile" });

  if (!dogOwnerProfile.customerId)
    return res.status(400).json({
      message: "Please add a payment method before making a request",
    });

  const { id } = await createPaymentIntent(
    dogSitterProfile,
    dogOwnerProfile,
    start,
    end
  );

  const request = await Request.create({
    ownerId,
    sitterId,
    start,
    end,
    paymentIntentId: id,
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

  const request = await Request.findById(requestId)
    .populate("ownerId", { username: 1, email: 1 })
    .populate("sitterId", { username: 1, email: 1 });

  if (!request) {
    res.status(404);
    throw new Error("No Request found");
  }

  if (declined) {
    await stripe.paymentIntents.cancel(request.paymentIntentId);
    request.set({
      accepted: false,
      declined: true,
    });
  }

  if (accepted) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(
        request.paymentIntentId
      );
      if (paymentIntent.status !== "succeeded") throw new Error();
    } catch (error) {
      res.status().json({
        message:
          "Notify the dog owner to update the payment method and try agian",
      });
    }
    request.set({
      accepted: true,
      declined: false,
    });
  }

  request = await request.save();

  res.status(200).send(request);
});
