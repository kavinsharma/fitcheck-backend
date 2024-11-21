const passport = require("passport");
require("dotenv").config();
const { register, findUser } = require("../../app/service/auth.service");
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
                done(null, profile)
            } catch (error) {
                console.error("Error during registration:", error);
            }
        }
    )
);
