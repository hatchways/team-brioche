const fs = require("fs");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinaryHelper");

exports.savePhoto = asyncHandler(async (req, res, next) => {
  const {photos} = req.files;
  
  photos.forEach(photo => {
    if (!(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
      res.status(400).json({msg: "Only .png, .jpg and .jpeg format allowed!"});
      return;
    }
  });

  const uploadPromises = photos.map(photo => cloudinary.uploader.upload(photo.path));

  const results = await Promise.all(uploadPromises);
  const urls = results.map(result => result.url);

  photos.forEach(photo => {
    fs.unlinkSync(photo.path);
  });

  res.status(200).json(urls);
});