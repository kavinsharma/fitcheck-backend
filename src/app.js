const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./app/routes/index.routes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: config.CLIENT_URL,
  }),
);

app.use("/api/v1", routes);

module.exports = app;
