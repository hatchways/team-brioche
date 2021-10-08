const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { conversationId, message } = req.body;
  const { _id: senderId } = await Profile.findOne({ userId }, "_id");

  const messageSuccess = await Message.create({
    senderId,
    message,
    conversationId,
  });
  let id = mongoose.Types.ObjectId(conversationId);
  if (!messageSuccess) {
    res.status(500);
    throw new Error("Something went wrong with send the message");
  }
  const lastMessage = await Conversation.findByIdAndUpdate(id, {
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
  const messages = await Message.find({ conversationId: convoId });
  if (!messages) {
    res.status(500).json(error);
  }
  res.status(200).json(messages);
});
