// routes.js

const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const router = express.Router();

router.get("/hello-world", async (req, res, next) => {
  return res.status(200).json({ data: "Hello from backend" });
});

router.use((req, res, next) => {
  res.status(404).json({ message: ResponseMessages.RES_MSG_NOT_FOUND_URL_EN });
});

module.exports = router;
