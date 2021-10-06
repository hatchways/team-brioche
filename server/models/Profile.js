const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
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
  customerId: {
    type: String,
  },
  rate: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
