const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const {
  upload: uploadController,
  uploadOtherUser,
} = require("../controllers/upload.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").post(upload.single("files"), uploadController);

router
  .route("/member-image")
  .post(verifyToken, upload.single("files"), uploadOtherUser);

module.exports = router;
