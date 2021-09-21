const mongoose = require("mongoose");
const userSchema = require("./User");
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
    enum: ["Male", "Female"],
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
