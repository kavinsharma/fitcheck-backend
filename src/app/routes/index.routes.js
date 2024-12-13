// routes.js

const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const productRouter = require("./products.routes.js");
const authRouter = require("./auth.routes.js");
const uploadRouter = require("./upload.routes.js");
const brandRouter = require("./brandMaster.routes.js");
const sizeRouter = require("./sizeMaster.routes.js");
const styleTypeRouter = require("./styleType.routes.js");
const closetRouter = require("./closets.routes.js");
const profileRouter = require("./profile.routes.js");
const userRouter = require("./users.routes.js");
const vtonRouter = require("./vton.routes.js");
const router = express.Router();

router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/size-guide-master", sizeRouter);
router.use("/style-type-master", styleTypeRouter);
router.use("/closets", closetRouter);
router.use("/profile", profileRouter);
router.use("/user", userRouter);

router.use("/upload", uploadRouter);
router.use("/vton", vtonRouter);
router.get("/hello-world", async (req, res, next) => {
  return res.status(200).json({ data: "Hello from backend" });
});

router.use((req, res, next) => {
  res.status(404).json({ message: ResponseMessages.RES_MSG_NOT_FOUND_URL_EN });
});

module.exports = router;
