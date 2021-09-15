const Request = require("../models/Request");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @route GET /request
// @desc get all request by user
// @access Private
exports.getRequestByUser = asyncHandler(async (req, res, next) => {
    const { id } = req.user; 
    
    const requests = await Request.find({ 'user._id': id })

    if(requests.length === 0){
        res.status(404)
        throw new Error("No Request found for this user")
    }

    res.send(requests)
});

// @route POST /request
// @desc create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.user; 
    let { sitterId, start, end } = req.body

    start = new Date(start)
    end = new Date(end)

    if(isNaN(start.getTime()) || isNaN(end.getTime())){
        res.status(400)
        throw new Error('Invalid start or end date')
    }

    // make sure the end date is always ahead of the start date
    if( end.getTime() <= start.getTime()){
        res.status(400)
        throw new Error("End time must be ahead of the start time")
    }

    // make sure not to save the same request more than once
    const checkRequest = await Request.findOne({ 'user._id': id, sitterId, start, end })
    if(checkRequest){
        res.status(400)
        throw new Error("this Request has already been saved")
    }

    const user = await User.findOne({ _id: id })

    const request = await Request.create({
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        },
        sitterId,
        start,
        end
    })

    if(!request){
        res.status(500)
        throw new Error("Something went wrong with your request please try again later")
    }

    res.send(request)
});

// @route PUT /request/:id
// @desc update approved/declined field of an existing Request 
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const { accepted, paid, declined } = req.body

    if(!mongoose.isValidObjectId(id)){
        res.status(400)
        throw new Error("Invalid Reqeust Id")
    }

    let request = await Request.findById(id)
    
    if(!request) {
        res.status(404)
        throw new Error("No Request found")
    }

    if(declined)
        request.declined = declined
    if(accepted) 
        request.accepted = accepted
    if(paid)
        request.paid = paid

    if(request.isNotConsistent()){
        res.status(400)
        throw new Error("Inconsistent request, adjust the declined/accepted field")
    }

    request = await request.save()
    res.send(request)
});