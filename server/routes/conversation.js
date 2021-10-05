const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  getConversations,
  createConversationViaProfile,
} = require("../controllers/conversation");

router.route("/").get(protect, getConversations);
router.route("/").post(protect, createConversation);
router.route("/profile").post(protect, createConversationViaProfile);

module.exports = router;
