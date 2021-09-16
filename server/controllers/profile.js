const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

// @route GET /profiles
// @desc get all profiles
// @access Public
exports.loadProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({});

  if (!profiles.length) {
    res.status(404);
    throw new Error("No Profiles found");
  }
  res.status(200).send(profiles);
});

//@route POST /profiles
//@desc CREATE a new profile
//@access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  userId = user._id;
  if (!user) {
    res.status(401);
    console.log(req);
    throw new Error("Not authorized");
  }
  let {
    firstName,
    lastName,
    address,
    phone,
    dob,
    userPhotoUrl,
    description,
    availability,
    gender,
  } = req.body;

  const phoneExists = await Profile.findOne({ phone });
  if (phoneExists) {
    res.status(400);
    throw new Error("A User with that phone number already exists");
  }
  const profile = await Profile.create({
    firstName,
    lastName,
    dob,
    phone,
    address,
    userPhotoUrl,
    description,
    availability,
    gender,
    userId,
  });
  if (!profile) {
    res.status(500);
    throw new Error(
      "Something went wrong with your profile please try again later"
    );
  }

  res.status(201).send(profile);
});

//@route GET /profiles/:_id
//@desc find one profile with a particular ID
//access public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);

  if (!profile) {
    res.status(404);
    throw new Error("No Profile found for this user");
  }

  res.status(200).send(profile);
});

//@route UPDATE/PUT /profiles/:_id
//@desc find one profile with a particular ID and update the info within
//access private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let newProfileData = req.body; //Not sure about this one
  const newProfile = await Profile.findByIdAndUpdate(id, newProfileData);
  if (!newProfile) {
    res.status(404);
    throw new Error(
      "Somthing went wrong while updating you Profile. Please try again later."
    );
  }
  res.status(200).send(newProfileData);
});
