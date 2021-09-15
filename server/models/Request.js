const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
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
  declined: {
      type: Boolean, 
      default: false
    },
  paid: {
      type: Boolean, 
      default: false
    }
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request
