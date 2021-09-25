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
  },
  galleryPics: {
    type: [String],
  },
  description: {
    type: String,
  },
  availability: {
    type: [String],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  phone: {
    type: Number,
    unique: true,
  },
  address: {
    type: String,
  },
  introduction: {
    type: String,
  },
  pitch: {
    type: String,
  },
  rate: {
    type: Number,
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
