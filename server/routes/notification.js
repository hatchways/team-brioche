const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  allNotifications,
  unreadNotifications,
  createNotification,
  notificationRead,
} = require("../controllers/notification");

router.route("/").get(protect, allNotifications);

router.route("/unread").get(protect, unreadNotifications);

router.route("/").post(protect, createNotification);

router.route("/:id").put(protect, notificationRead);

module.exports = router;
