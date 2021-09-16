const mongoose = require("mongoose");
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
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userPhotoUrl: {
    type: String,
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
    unique: true,
  },
  address: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
