const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: {
    type: Array.apply,
    ref: "User",
    required: true,
  },
});
