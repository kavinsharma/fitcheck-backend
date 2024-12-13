const express = require("express");
const { getImage } = require("../controllers/vton.controller");

const router = express.Router();

router.route("/get-image").post(getImage);

module.exports = router;
