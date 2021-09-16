const mongoose = require("mongoose");
const User = require("./User").Schema;
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
    ref: "user",
    required: true,
  },
  userPhotoUrls: {
    type: Array,
  },
  description: {
    type: String,
  },
  availability: {
    type: Array,
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
