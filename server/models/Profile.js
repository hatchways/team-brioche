const mongoose = require("mongoose");
const User = require("./User").Schema;
const userSchema = require("./User");
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
});

module.exports = Profile = mongoose.model("profile", profileSchema);
