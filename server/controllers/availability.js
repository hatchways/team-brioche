const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.updateAvailability = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    res.status(400).json({ error });
  }
  const { weeklyTimeRange } = req.body;
  console.log(weeklyTimeRange);
  const newProfile = await Profile.findOneAndUpdate(
    { userId: id },
    { availability: { weeklyTimeRange: weeklyTimeRange } },
    { new: true }
  );
  if (!newProfile) {
    res.status(500).json({ error });
  }
  res.status(200).json(newProfile);
});
