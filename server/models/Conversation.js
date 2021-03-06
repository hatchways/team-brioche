const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
    ref: "User",
    required: true,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
