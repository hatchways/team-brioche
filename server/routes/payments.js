const express = require("express");
const { createCustomer, checkout } = require("../controllers/payments");
const protect = require("../middleware/auth");
const router = express.Router();

router.route("/create-customer/:profileId").post(protect, createCustomer);
module.exports = router;
