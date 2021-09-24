const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getRequests, createRequest, updateRequest } = require('../controllers/request');
const { validateNewRequest, validateRequestUpdate } = require("../validate")
 
router.route("/").get(protect, getRequests)

router.route("/").post(protect, validateNewRequest, createRequest)

router.route("/:id").patch(protect, validateRequestUpdate, updateRequest)

module.exports = router