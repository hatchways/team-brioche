const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { conversationId, message } = req.body;
  const messageSuccess = await Message.create({
    senderId,
    message,
    conversationId,
  });
  if (!messageSuccess) {
    res.status(500).json({ error });
  }
  res.status(201).json({ messageSent: { message: messageSuccess } });
});
exports.getMessages = asyncHandler(async (req, res, next) => {
  const { convoId } = req.params;
  const messages = await Message.find({ conversationId: convoId });
  if (!messages) {
    res.status(500).json({ error });
  }
  res.status(200).json(messages);
});
