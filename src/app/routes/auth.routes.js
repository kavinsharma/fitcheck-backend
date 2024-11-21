const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const validate = require("../middleware/validator.js");
const {
  registerOneSchema,
  loginSchema,
  registerTwoSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
const {
  register,
  login,
  userDetails,
  verifyHash,
} = require("../controllers/auth.controller.js");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();

router.route("/sign-up").post(validate(registerOneSchema), register);
router
  .route("/user-details")
  .post(verifyToken, validate(registerTwoSchema), userDetails);
router.route("/login").post(validate(loginSchema), login);

router.route("/verify").get(verifyHash);
module.exports = router;
