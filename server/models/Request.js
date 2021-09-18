const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});
requestSchema.methods.isNotConsistent = function(){
  if(this.declined && this.accepted){
    // request is not consistent
    return true
  }
  return false
}
const Request = mongoose.model("request", requestSchema);

module.exports = Request;
