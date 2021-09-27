const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  allNotifications,
  unreadNotifications,
  createNotification,
  notificationRead
} = require("../controllers/notification");

router.route("/").get(protect, allNotifications); //get all the notifications

router.route("/unread").get(protect, unreadNotifications); //get all unread notifications

router.route("/").post(protect, createNotification); //create a new notification

router.route("/:id").put(protect, notificationRead); //set notification read

module.exports = router;
