const express = require("express");
const multer = require("multer");
const router = express.Router();
const protect = require("../middleware/auth");
const { savePhoto, getProfile, deletePhoto } = require("../controllers/profile");

const upload = multer({dest: './uploads'});

router.route("/get-profile")
	.get(protect, getProfile);

router.route("/save-photo")
	.post(protect, upload.fields([{name: 'photos'}]), savePhoto);

router.route("/delete-photo")
	.delete(protect, deletePhoto);

module.exports = router;