const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { conversationId, message } = req.body;
  const { _id: senderId } = await Profile.findOne({ userId: id }, "_id");
  const messageSuccess = await Message.create({
    senderId,
    message,
    conversationId,
  });
  let convoId = mongoose.Types.ObjectId(conversationId);
  if (!messageSuccess) {
    res.status(500);
    throw new Error("Something went wrong with send the message");
  }
  const lastMessage = await Conversation.findByIdAndUpdate(convoId, {
    lastMessage: messageSuccess.id,
  });
  if (!lastMessage) {
    res.status(500);
    throw new Error("Something went wrong while updating conversation");
  }
  res.status(201).json({ messageSent: { message: messageSuccess } });
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  const { convoId } = req.params;
  const messages = await Message.find({ conversationId: convoId }).populate(
    "senderId"
  );
  if (!messages) {
    res.status(500).json(error);
  }
  res.status(200).json(messages);
});
