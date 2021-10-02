const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { updateAvailability } = require("../controllers/availability");

router.route("/").patch(protect, updateAvailability);

module.exports = router;
