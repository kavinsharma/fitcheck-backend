const express = require("express");
const cors = require("cors");
const config = require("./config");
const { connectToReqDatabase } = require("./core/scripts/db.connection");

const routes = require("./app/routes/index.routes");
// const { setupLogger } = require("./app/middleware/logger.middleware");

const app = express();
// setupLogger(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: config.CLIENT_URL,
  }),
);

app.use(connectToReqDatabase);

app.use("/api/v1", routes);

module.exports = app;
