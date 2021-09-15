const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getRequestByUser, createRequest, updateRequest } = require('../controllers/request');
const { validateNewRequest, validateRequestUpdate } = require("../validate")
 
router.route("/").get(protect, getRequestByUser)

router.route("/").post(protect, validateNewRequest, createRequest)

router.route("/:id").put(protect, validateRequestUpdate, updateRequest)

module.exports = router