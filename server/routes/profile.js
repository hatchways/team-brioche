const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { savePhoto } = require("../controllers/profile");
const {
  loadProfiles,
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profile");

router.route("/").get(protect, loadProfiles); //get all the profiles

router.route("/").post(protect, createProfile); //create a new profile

router.route("/:id").get(protect, getProfile); //Get a profile with ID

router.route("/:id").put(protect, updateProfile); //Edit a profile with a particular ID

module.exports = router;

const upload = multer({ dest: "./uploads" });

// router.route("/photo").post(protect, savePhoto);
router
  .route("/save-photo")
  .post(upload.fields([{ name: "photos" }]), savePhoto);

module.exports = router;
