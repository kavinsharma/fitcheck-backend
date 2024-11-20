const passport = require("passport");
require("dotenv").config();
const { register, findUser } = require("../../app/service/auth.service");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
    console.log("🚀 ~ passport.serializeUser ~ user:", user)
    done(null, user);
});

passport.deserializeUser((user, done) => {
    //   findUser(id)
    //     .then((user) => {
    done(null, user);
    //     })
    //     .catch((error) => {
    //       done(error, null);
    //     });
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
                // const data = await register(profile);
                console.log("🚀 ~ profile:", profile)
                done(profile)
                // if (data) done(null, data);
            } catch (error) {
                console.error("Error during registration:", error);
            }
        }
    )
);
