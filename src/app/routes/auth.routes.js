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
  oauthCallback
} = require("../controllers/auth.controller");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken.js");
const passport = require("passport");

const router = express.Router();

router.route("/sign-up").post(validate(registerOneSchema), register);
router
  .route("/user-details")
  .post(verifyToken, validate(registerTwoSchema), userDetails);
router.route("/login").post(validate(loginSchema), login);

router.route("/verify").get(verifyHash);
router.route("/google").get(function (req, res, next) {
  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
    },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/google");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/profile")
      });
    }
  )(req, res, next);
});

router.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  oauthCallback
);

module.exports = router;
