const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  loadProfiles,
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profile");
//need validation functions

router.route("/").get(protect, loadProfiles); //get all the profiles

router.route("/").post(createProfile); //create a new profile

router.route("/:id").get(getProfile); //Get a profile with ID

router.route("/:id").put(protect, updateProfile); //Edit a profile with a particular ID

module.exports = router;
