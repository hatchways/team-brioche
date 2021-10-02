const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const { validateSearchParams } = require("../validate");
const {
  loadProfiles,
  createProfile,
  getProfile,
  updateProfile,
  getProfileByUser,
  savePhoto,
  deletePhoto,
  getProfileFromUserId,
  searchSitterProfiles,
} = require("../controllers/profile");

const upload = multer({ dest: "./uploads" });

router.route("/").get(protect, loadProfiles); //get all the profiles
router.route("/:id").get(protect, getProfile); //Get a profile with ID
router.route("/get-profile").get(protect, getProfileFromUserId);

router.route("/").post(protect, createProfile); //create a new profile
router.route("/search").post(validateSearchParams, searchSitterProfiles);
router
  .route("/save-photo")
  .post(protect, upload.fields([{ name: "photos" }]), savePhoto);

router.route("/:id").put(protect, updateProfile); //Edit a profile with a particular ID

router.route("/delete-photo").delete(protect, deletePhoto);

module.exports = router;
