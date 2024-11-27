const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const {
  basicUserDetails,
  getProfile,
} = require("../controllers/users.controller.js");
const router = express.Router();
const validate = require("../middleware/validator.js");
const {
  userDetailsSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
router.route("/").get(verifyToken, getProfile);
router
  .route("/")
  .post(verifyToken, validate(userDetailsSchema), basicUserDetails);
router
  .route("/edit")
  .post(verifyToken, validate(userDetailsSchema), basicUserDetails);

module.exports = router;
