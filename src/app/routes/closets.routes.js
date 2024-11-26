const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const {
  addCloset,
  comapare,
  getCloset,
} = require("../controllers/closets.controller.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const validate = require("../middleware/validator.js");
const {
  closetItemSchema,
} = require("../../data/validationSchema/closets.validator.js");

const router = express.Router();

router.route("/save").post(verifyToken, validate(closetItemSchema), addCloset);
router.route("/compare").get(verifyToken, comapare);

router.route("/get").get(verifyToken, getCloset);

module.exports = router;
