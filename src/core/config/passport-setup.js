const passport = require("passport");
require("dotenv").config();
const AppleStrategy = require("passport-apple");
const { register, findUser } = require("../../app/service/auth.service");
const config = require("../../config");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${process.env.CALLBACK_URL_GOOGLE}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        done(null, profile);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  ),
);

passport.use(
  new AppleStrategy(
    {
      clientID: config.APPLE_CLIENT_I, // Your Service ID
      teamID: config.APPLE_TEAM_ID, // Your Apple Developer Team ID
      callbackURL: config.APPLE_CALLBACK_URL,
      keyID: config.APPLE_KEY_ID, // The ID of your private key
      privateKey: config.APPLE_PRIVATE_KEY, // Path to the downloaded private key
      passReqToCallback: false,
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        return done(null, profile);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
