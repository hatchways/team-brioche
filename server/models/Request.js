const mongoose = require("mongoose");
const userSchema = require("../models/User")


const requestSchema = new mongoose.Schema({
  userId: userSchema,
  sitterId: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  accepted: {
      type: Boolean, 
      default: false
    },
  paid: {
      type: Boolean, 
      default: false
    }
});

const Request = mongoose.model("request", requestSchema);

module.exports.Request = Request
