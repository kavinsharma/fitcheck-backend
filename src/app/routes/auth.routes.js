const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const validate = require("../middleware/validator.js");
const {
  registerOneSchema,
  loginSchema,
  registerTwoSchema,
  forgetPasswordSchema,
  createPasswordSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
const {
  register,
  login,
  userDetails,
  verifyHash,
  oauthCallback,
  oautAppleCallback,
  forgetPassword,
  createPassword,
} = require("../controllers/auth.controller");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken.js");
const passport = require("passport");
const emailMiddleware = require("../middleware/smtpEmail.middleware.js");

const router = express.Router();

router
  .route("/sign-up")
  .post(validate(registerOneSchema), register, emailMiddleware);
router
  .route("/user-details")
  .post(verifyToken, validate(registerTwoSchema), userDetails);
router.route("/login").post(validate(loginSchema), login);

router
  .route("/forget-password")
  .post(validate(forgetPasswordSchema), forgetPassword, emailMiddleware);

router
  .route("/reset-password")
  .post(verifyToken, validate(createPasswordSchema), createPassword);
router.route("/verify").post(verifyHash);
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
        return res.redirect("/profile");
      });
    },
  )(req, res, next);
});

router.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  oauthCallback,
);

router.route("/apple").get(function (req, res, next) {
  passport.authenticate(
    "apple",
    {
      scope: ["name", "email"], // Apple provides limited scopes
    },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/apple");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/profile");
      });
    },
  )(req, res, next);
});

router.route("/apple/callback").get(
  passport.authenticate("apple", {
    session: false,
    failureRedirect: "/login",
  }),
  oautAppleCallback,
);

module.exports = router;
