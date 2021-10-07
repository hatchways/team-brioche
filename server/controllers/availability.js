const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.updateAvailability = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  console.log(req.body);
  const { weeklyTimeRange, rate } = req.body;
  const newProfile = await Profile.findOneAndUpdate(
    { userId: id },
    {
      availability: { weeklyTimeRange: weeklyTimeRange },
      rate: parseInt(rate),
    },
    { new: true }
  );
  if (!newProfile) {
    res.status(500).json({ error: "Something went wrong with the update" });
  }
  res.status(200).json(newProfile);
});
