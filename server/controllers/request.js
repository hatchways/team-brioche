const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request
// @desc get all request by user
// @access Private
exports.getRequestByUser = asyncHandler(async (req, res, next) => {

});

// @route POST /request
// @desc create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {

});

// @route PUT /request/:id
// @desc update approved/declined field of an existing Request 
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {

});