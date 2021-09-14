const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {getRequestByUser, createRequest, updateRequest} = require('../controllers/request')

router.route("/").get(protect, getRequestByUser)

router.route("/").post(protect, createRequest)

router.route("/:id").put(protect, updateRequest)

module.exports = router