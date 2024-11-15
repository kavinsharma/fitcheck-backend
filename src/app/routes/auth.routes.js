const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const validate = require("../middleware/validator.js");
const {
  registerSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
const { register } = require("../controllers/auth.controller.js");

const router = express.Router();

router.route("/sign-up").post(validate(registerSchema), register);

module.exports = router;
