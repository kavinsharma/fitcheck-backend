const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const styleTypeMaster = require("../controllers/styleTypeMaster.controller.js");
const router = express.Router();

router.route("/get").get(styleTypeMaster.getList);
router.route("/bulk-create").post(styleTypeMaster.bulkCreate);
router.route("/create").post(styleTypeMaster.create);
router.route("/update").post(styleTypeMaster.update);

module.exports = router;
