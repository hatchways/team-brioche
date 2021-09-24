const fs = require("fs");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinaryHelper");

exports.getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  const profile = await Profile.findOne({userId: user.id});
  if (profile) {
    res.status(200).json({
      success: {
        profile: profile
      }
    });
  }
  else {
    res.status(401);
    throw new Error('User info is not correct');
  }
})

exports.savePhoto = asyncHandler(async (req, res) => {
  const user = req.user;
  const {photos} = req.files;
  
  photos.forEach(photo => {
    if (!(photo.mimetype === "image/png" || photo.mimetype === "image/jpg" || photo.mimetype === "image/jpeg")) {
      return res.status(400).json({msg: "Only .png, .jpg and .jpeg format allowed!"});
    }
  });

  const uploadPromises = photos.map(photo => cloudinary.uploader.upload(photo.path));

  const results = await Promise.all(uploadPromises);
  const urls = results.map(result => result.url);

  photos.forEach(photo => {
    fs.unlinkSync(photo.path);
  });

  const profile = await Profile.findOneAndUpdate({userId: user.id}, {profilePic: urls[0]});
  
  if (profile) {
    const oldUrl = profile.profilePic;
    if (oldUri) {
      const publicId = oldUrl.substring(oldUrl.lastIndexOf('/') + 1, oldUrl.lastIndexOf('.'));
      await cloudinary.uploader.destroy(publicId);
    }
    res.status(200).json({
      success: { profilePic: urls[0] }
    });
  }
  else {
    res.status(404);
    throw new Error('User info is not correct');
  }
});

exports.deletePhoto = asyncHandler(async (req, res) => {
  const user = req.user;
  
  const profile = await Profile.findOneAndUpdate({userId: user.id}, {profilePic: ''});

  if (profile) {
    const oldUrl = profile.profilePic;
    const publicId = oldUrl.substring(oldUrl.lastIndexOf('/') + 1, oldUrl.lastIndexOf('.'));
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({
      success: true
    });
  }
  else {
    res.status(401);
    throw new Error('User info is not correct');
  }
})