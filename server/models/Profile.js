const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  galleryPics: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
  },
  availability: {
    dateRange: { startDate: String, endDate: String },
    weeklyTimeRange: [{ startTime: String, endTime: String }],
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "prefer not to say"],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
