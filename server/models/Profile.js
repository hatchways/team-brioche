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
    dateRange: { startDate: Date, endDate: Date },
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
  isSitter: {
    type: Boolean,
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
  customerId: {
    type: String,
  },
});

profileSchema.methods.dateTest = function (dropInDate, dropOffDate) {
  const { startDate, endDate } = this.availability.dateRange;

  let dropInDateTest = true;
  let dropOffDateTest = true;

  const sanityCheck = endDate.getTime() > Date.now();
  if (dropInDate) dropInDateTest = startDate.getTime() <= dropInDate.getTime();
  if (dropOffDate) dropOffDateTest = endDate.getTime() >= dropOffDate.getTime();

  return dropInDateTest && dropOffDateTest && sanityCheck;
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
