const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Profile = require("../models/Profile");

exports.createConversationViaProfile = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { profileId } = req.body;
  if (!profileId) {
    res.status(400);
    throw new Error("Bad Request");
  }
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
  const { receiverId } = req.body;
  const senderId = req.user.id;
  !receiverId && res.status(400).json({ error });

  const existingConvo = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  }).populate("lastMessage");
  if (existingConvo) {
    return res.status(200).json(existingConvo);
  } else {
    const conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
    if (!conversation) {
      res.status(500);
      throw new Error("Something went wrong with the conversation");
    }
    res.status(201).json(conversation);
  }
});

exports.getConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const conversations = await Conversation.find({
    members: { $in: [userId] },
  })
    .populate("lastMessage")
    .populate("members");
  if (!conversations) {
    res.status(500);
    throw new Error("Something went wrong with getting the conversations");
  }
  res.status(200).json(conversations);
});
