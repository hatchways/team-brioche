const asyncHandler = require("express-async-handler");
const fs = require("fs");
const Profile = require("../models/Profile");
const cloudinary = require("../utils/cloudinaryHelper");

const mongoose = require("mongoose");
const User = require("../models/User");
const { profile } = require("console");
const { removeWhiteSpace } = require("../utils/queryStringHelpers");

exports.getProfileFromUserId = asyncHandler(async (req, res) => {
  const user = req.user;

  const profile = await Profile.findOne({ userId: user.id });
  if (profile) {
    res.status(200).json({
      success: {
        profile: profile,
      },
    });
  } else {
    res.status(404);
    throw new Error("User info is not correct");
  }
});

// @route GET /profiles
// @desc get all profiles and if query string is added, then sort according to the included parameters
// @access Public
exports.loadProfiles = asyncHandler(async (req, res, next) => {
  let { address, dropInDate, dropOffDate } = req.query;
  if (address || dropInDate || dropOffDate) {
    [address, dropInDate, dropOffDate] = removeWhiteSpace([
      address,
      dropInDate,
      dropOffDate,
    ]);

    let profiles = await Profile.find({
      address: { $regex: address || "", $options: "i" },
      isSitter: true,
    });
    profiles = profiles.filter((profile) =>
      profile.dateTest(dropInDate, dropOffDate)
    );
    return res.status(200).send(profiles);
  }

  const profiles = await Profile.find({}, "-userId");
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
  //checks if there is a Profile with this userID already
  const findProfile = await Profile.findOne({ userId: userId });
  if (findProfile) {
    res.status(400);
    throw new Error("This user already has a profile");
  }
  // const phoneExists = await Profile.findOne({ phone });
  // if (phoneExists) {
  //   res.status(400);
  //   throw new Error("A User with that phone number already exists");
  // }
  const profile = await Profile.create({
    firstName,
    lastName,
    dob,
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
  res.status(201).json({
    profile: {
      profileId: profile._id,
      profileData: { profile },
    },
  });
});

//@route GET /profiles/:_id
//@desc find one profile with a particular ID
//access public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Bad request");
  }
  const profile = await Profile.findById(id);

  if (!profile) {
    res.status(404);
    throw new Error("No Profile found for this user");
  }

  res.status(200).send(profile);
});

//@route GET /profiles OF LOGGED IN USER
//@desc find one profile with a particular ID
//access Private
exports.getProfileByUser = asyncHandler(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.user.id);
  if (!id) {
    res.status(400).json({ error });
    // throw new Error("User not logged in");
  }
  const profile = await Profile.findOne({ userId: id });

  if (!profile) {
    res.status(404);
    throw new Error("This User doesn't have a profile");
  }

  res.status(200).send(profile);
});

//@route UPDATE/PUT /profiles/:_id
//@desc find one profile with a particular ID and update the info within
//access private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const {
    firstName,
    lastName,
    dob,
    phone,
    address,
    description,
    availability,
    gender,
    isSitter,
  } = req.body;
  const userId = mongoose.Types.ObjectId(id);

  const profile = await Profile.findOne({ userId: id }, "_id");
  const updatedData = {
    firstName,
    lastName,
    dob,
    phone,
    address,
    description,
    availability,
    gender,
    isSitter,
  };
  const newProfile = await Profile.findByIdAndUpdate(profile._id, updatedData, {
    new: true,
  });
  if (!newProfile) {
    res.status(500);
    throw new Error(
      "Somthing went wrong while updating you Profile. Please try again later."
    );
  }
  res.status(200).send(newProfile);
});

exports.savePhoto = asyncHandler(async (req, res) => {
  const user = req.user;
  const { photos } = req.files;

  photos.forEach((photo) => {
    if (
      !(
        photo.mimetype === "image/png" ||
        photo.mimetype === "image/jpg" ||
        photo.mimetype === "image/jpeg"
      )
    ) {
      return res
        .status(400)
        .json({ msg: "Only .png, .jpg and .jpeg format allowed!" });
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

  const profile = await Profile.findOneAndUpdate(
    { userId: user.id },
    { profilePic: urls[0] }
  );

  if (profile) {
    const oldUrl = profile.profilePic;
    if (oldUrl) {
      const publicId = oldUrl.substring(
        oldUrl.lastIndexOf("/") + 1,
        oldUrl.lastIndexOf(".")
      );
      await cloudinary.uploader.destroy(publicId);
    }
    res.status(200).json({
      success: { profilePic: urls[0] },
    });
  } else {
    res.status(404);
    throw new Error("User info is not correct");
  }
});

exports.deletePhoto = asyncHandler(async (req, res) => {
  const user = req.user;

  const profile = await Profile.findOneAndUpdate(
    { userId: user.id },
    { profilePic: "" }
  );

  if (profile) {
    const oldUrl = profile.profilePic;
    const publicId = oldUrl.substring(
      oldUrl.lastIndexOf("/") + 1,
      oldUrl.lastIndexOf(".")
    );
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(401);
    throw new Error("User info is not correct");
  }
});
