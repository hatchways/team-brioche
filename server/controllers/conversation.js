const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

//For scenario where ownerId will contact other user Via profile
exports.createConversationViaProfile = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { profileId } = req.body;
  const receiver = await Profile.findById(profileId);
  !receiver && res.status(400).json({ error });
  const receiverId = receiver.userId;
  const conversation = await Conversation.create({
    members: [senderId, receiverId],
  });
  if (!conversation) {
    res.status(500);
    throw new Error("Something went wrong with the conversation");
  }

  res.status(201).json(conversation);
});
exports.createConversation = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { profileId } = req.body;
  const receiver = await Profile.findById(profileId);
  !receiver && res.status(400).json({ error });
  const receiverId = receiver.userId;
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
  const conversations = await Conversation.find({
    members: { $in: [userId] },
  });
  if (!conversations) {
    res.status(500);
    throw new Error("Something went wrong with getting the conversations");
  }
  res.status(201).json(conversations);
});
