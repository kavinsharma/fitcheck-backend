const express = require("express");
const cors = require("cors");
const session = require("express-session");
const config = require("./config");
const routes = require("./app/routes/index.routes");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();

require("./core/config/passport-setup");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: config.CLIENT_URL,
  }),
);

app.use(cookieParser());

app.use(
  session({
    secret: config.COOKIE_KEY || "COOKIE_KEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", routes);

module.exports = app;
