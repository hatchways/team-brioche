const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
    ref: "User",
    required: true,
  },
});

module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
