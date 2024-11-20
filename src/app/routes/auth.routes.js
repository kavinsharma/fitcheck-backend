const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const validate = require("../middleware/validator.js");
const {
  registerSchema,
} = require("../../data/validationSchema/userSchema.validator.js");
const { register } = require("../controllers/auth.controller.js");
const passport = require("passport");

const router = express.Router();

router.route("/sign-up").post(validate(registerSchema), register);

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
  })
  // authController.oauthCallback
);

module.exports = router;
