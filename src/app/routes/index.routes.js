// routes.js

const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { NotFound } = require("../middleware/errors");
const router = express.Router();

router.get("/hello-world", async (req, res, next) => {
  return res.status(200).json({ data: "Hello from backend" });
});

router.use((req, res, next) => {
  next(
    new NotFound(
      `${ResponseMessages.RES_MSG_NOT_FOUND_URL_EN}: ${req.originalUrl}`,
    ),
  );
});

module.exports=router;
