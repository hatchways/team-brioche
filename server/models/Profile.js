const mongoose = require("mongoose");
const userSchema = require("./User");
const email = User.find_by_id({});
const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
  userPhotoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  availability: {
    type: String,
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
