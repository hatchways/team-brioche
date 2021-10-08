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
  deletePhoto,
  getProfileFromUserId,
} = require("../controllers/profile");

const upload = multer({ dest: "./uploads" });

router.route("/").get(protect, loadProfiles); //get all the profiles

router.route("/get-profile").get(protect, getProfileFromUserId);

router
  .route("/save-photo")
  .post(protect, upload.fields([{ name: "photos" }]), savePhoto);

router.route("/delete-photo").delete(protect, deletePhoto);

router.route("/:id").get(protect, getProfile); //Get a profile with ID

router.route("/").put(protect, updateProfile); //Edit a profile of a logged in User
module.exports = router;
