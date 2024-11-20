const router = require("express").Router();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const { upload } = require("../controllers/upload.controller");

router.route("/").get(multipartMiddleware, upload);

module.exports = router;
