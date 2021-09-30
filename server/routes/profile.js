const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const {
  loadProfiles,
  createProfile,
  getProfile,
  updateProfile,
  getProfileByUser,
  savePhoto,
} = require("../controllers/profile");

const upload = multer({ dest: "./uploads" });

router.route("/").get(protect, loadProfiles); //get all the profiles

router.route("/").post(protect, createProfile); //create a new profile

router.route("/:id").get(protect, getProfile); //Get a profile with  profileID

router.route("/:id").put(protect, updateProfile); //Edit a profile with a particular ID

// router.route("/photo").post(protect, savePhoto);
router
  .route("/save-photo")
  .post(protect, upload.fields([{ name: "photos" }]), savePhoto);

module.exports = router;
