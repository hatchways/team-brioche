const express = require("express");
const multer = require("multer");
const router = express.Router();
const protect = require("../middleware/auth");
const { savePhoto } = require("../controllers/profile");

const upload = multer({dest: './uploads'});

// router.route("/photo").post(protect, savePhoto);
router.route("/save-photo")
	.post(upload.fields([{name: 'photos'}]), savePhoto);

module.exports = router;