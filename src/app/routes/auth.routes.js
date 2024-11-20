const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const validate = require("../middleware/validator.js");
const {
  registerSchema,
  loginSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
const { register, login } = require("../controllers/auth.controller.js");

const router = express.Router();

router.route("/sign-up").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
module.exports = router;
