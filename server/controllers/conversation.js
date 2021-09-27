const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Conversation = require("../models/Conversation");
exports.createConversation = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { receiverId } = req.body;

  const conversation = await Conversation.create({
    members: [senderId, receiverId],
  });
  if (!conversation) {
    res.status(500);
    throw new Error("Something went wrong with the conversation");
  }

  res.status(201).json(conversation);
});
exports.getConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    res.status(400);
    throw new Error("Bad request");
  }
  const conversations = await Conversation.find({
    members: { $in: [userId] },
  });
  if (!conversations) {
    res.status(500);
    throw new Error("Something went wrong with the conversation");
  }
  res.status(201).json(conversations);
});
