const asyncHandler = require("express-async-handler");
const fs = require("fs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const cloudinary = require("../utils/cloudinaryHelper");
const { profile } = require("console");

// @route GET /profiles
// @desc get all profiles
// @access Public
exports.loadProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({});
  profile.select();

  if (!profiles.length) {
    res.status(400);
    throw new Error("No Profiles found");
  }
  res.status(200).send(profiles);
});

//@route POST /profiles
//@desc CREATE a new profile
//@access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const userId = user?._id;
  const {
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
  const {
    firstName,
    lastName,
    dob,
    phone,
    address,
    description,
    availability,
    gender,
  } = req.body;

  // Check if the logged in person is the owner of the profile
  // NOT WORKING rn even though both ids are same

  const user = await User.findById(req.user.id);
  const profile = await Profile.findById(id);
  const userId = user._id.toString();
  const profileId = profile.userId.toString();
  if (userId !== profileId) {
    res.status(403);
    throw new Error("You are not Authorized to change the data");
  }

  const newProfile = await Profile.findByIdAndUpdate(id, {
    firstName,
    lastName,
    dob,
    phone,
    address,
    description,
    availability,
    gender,
  });
  if (!newProfile) {
    res.status(404);
    throw new Error(
      "Somthing went wrong while updating you Profile. Please try again later."
    );
  }
  res.status(200).send(newProfileData);
});

exports.savePhoto = asyncHandler(async (req, res, next) => {
  const { photos } = req.files;
  const id = await User.findById(req.user.id);
  photos.forEach((photo) => {
    if (
      !(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      )
    ) {
      res
        .status(400)
        .json({ msg: "Only .png, .jpg and .jpeg format allowed!" });
      return;
    }
  });

  const uploadPromises = photos.map((photo) =>
    cloudinary.uploader.upload(photo.path)
  );

  const results = await Promise.all(uploadPromises);
  const urls = results.map((result) => result.url);

  photos.forEach((photo) => {
    fs.unlinkSync(photo.path);
  });
  let updatedData = {
    galleryPics: urls,
  };
  const addPics = await Profile.findByIdAndUpdate(id._id, updatedData);
  if (!addPics) {
    res.status(404);
    throw new Error(
      "Somthing went wrong while adding your photos. Please try again later."
    );
  }

  res.status(200).json(urls);
});
