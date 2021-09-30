const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const { getProfileByUser } = require("../controllers/profile");

router.route("/").get(protect, searchUsers);
router.route("/profile").get(protect, getProfileByUser);

module.exports = router;
