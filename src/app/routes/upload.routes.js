const router = require("express").Router();
const multer = require("multer");
const upload = multer();

const {
  upload: uploadController,
} = require("../controllers/upload.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").post(upload.single("files"), uploadController);

module.exports = router;
