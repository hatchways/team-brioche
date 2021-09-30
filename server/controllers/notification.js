const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/User");
const Notification = require("../models/Notification");

// @route GET /notification
// @desc get all notifications
// @access Private
exports.allNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const userId = user._id;

  const notifications = await Notification.find({userId});
  res.status(200).send(notifications);
});

// @route GET /notification/unread
// @desc get all unread notifications
// @access Private
exports.unreadNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const userId = user._id;

  const notifications = await Notification.find({userId, read: false});
  res.status(200).send(notifications);
});

//@route POST /notification
//@desc CREATE a new notification
//@access Private
exports.createNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const userId = user._id;
  const {
    type,
    title,
    description
  } = req.body;
  const notification = await Notification.create({
    type,
    title,
    description,
    userId,
    date: Date.now()
  });
  if (!notification) {
    res.status(500);
    throw new Error(
      "Something went wrong with this notification. Please try again later"
    );
  }

  res.status(201).send(notification);
});

//@route PUT /notification/:_id
//@desc find one notification with a particular ID and update read as read
//access private
exports.notificationRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user.id);
  const notification = await Notification.findById(id);
  if (user._id !== notification.userId) {
    res.status(401);
    throw new Error("You are not Authorized to change this read state");
  }

  notification.read = true;
  notification.save();
  res.status(200).send(updatedNotification);
});
