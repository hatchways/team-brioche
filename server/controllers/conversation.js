const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Profile = require("../models/Profile");

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { profileId } = req.body;
  !profileId && res.status(400).json({ error: "Bad Request" });
  const receiverId = mongoose.Types.ObjectId(profileId);
  const userId = mongoose.Types.ObjectId(req.user.id);
  !receiverId && res.status(400).json({ error });
  const getProfile = await Profile.findOne({ userId: userId });
  const senderId = getProfile._id;
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
  const { _id } = await Profile.findOne({ userId }, "_id");
  const conversations = await Conversation.find({
    members: { $in: [_id] },
  })
    .populate("lastMessage")
    .populate("members");
  if (!conversations) {
    res.status(500);
    throw new Error("Something went wrong with getting the conversations");
  }
  res.status(200).json(conversations);
});
