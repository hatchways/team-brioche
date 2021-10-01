const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { updateAvailability } = require("../controllers/availability");

router.route("/").put(protect, updateAvailability);

module.exports = router;
