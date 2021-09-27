const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  getConversations,
  createConversationViaProfile,
} = require("../controllers/conversation");

router.route("/").get(protect, getConversations); //GET a conversation
router.route("/").post(protect, createConversation); //CREATE a conversation
router.route("/profile").post(protect, createConversationViaProfile); //CREATE a conversation

module.exports = router;
