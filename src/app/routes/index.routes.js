// routes.js

const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const productRouter = require("./products.routes.js");
const authRouter = require("./auth.routes.js");
const uploadRouter = require("./upload.routes.js");
const brandRouter = require("./brandMaster.routes.js");
const router = express.Router();
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/upload", uploadRouter);
router.get("/hello-world", async (req, res, next) => {
  return res.status(200).json({ data: "Hello from backend" });
});

router.use((req, res, next) => {
  res.status(404).json({ message: ResponseMessages.RES_MSG_NOT_FOUND_URL_EN });
});

module.exports = router;
