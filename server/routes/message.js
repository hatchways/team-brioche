const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { sendMessage, getMessages } = require("../controllers/message");

router.route("/:convoId").get(protect, getMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
