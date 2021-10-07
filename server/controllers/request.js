const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const Profile = require("../models/Profile");

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
  let { profileId, start, end } = req.body;
  const userByProfile = await Profile.findById(profileId, "userId");
  const sitterId = userByProfile.userId;
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

  const request = await Request.create({
    ownerId,
    sitterId,
    start,
    end,
  });

  if (!request) {
    res.status(500);
    throw new Error(
      "Something went wrong with your request please try again later"
    );
  }
  const requestSuccess = {
    message: "Your request has been sent",
    request,
  };
  res.status(200).send(requestSuccess);
});

// @route PATCH /request/:id
// @desc dog-sitter update approved/decline an existing Request
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const requestId = req.params.id;
  const { accepted, declined } = req.body;

  if (!mongoose.isValidObjectId(requestId)) {
    res.status(400);
    throw new Error("Invalid Reqeust Id");
  }

  let request = await Request.findById(requestId)
    .populate("ownerId", { username: 1, email: 1 })
    .populate("sitterId", { username: 1, email: 1 });

  if (!request) {
    res.status(404);
    throw new Error("No Request found");
  }

  if (declined)
    request.set({
      accepted: false,
      declined: true,
    });
  if (accepted)
    request.set({
      accepted: true,
      declined: false,
    });

  request = await request.save();

  res.status(200).send(request);
});
