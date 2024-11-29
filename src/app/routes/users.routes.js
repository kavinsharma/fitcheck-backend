const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const validate = require("../middleware/validator.js");
const { accountDetails } = require("../controllers/users.controller.js");
const {
  accountDetailsSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const router = express.Router();

router
  .route("/account-details")
  .post(verifyToken, validate(accountDetailsSchema), accountDetails);

module.exports = router;
