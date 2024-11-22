const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const sizeMaster = require("../controllers/sizeMaster.controller.js");
const router = express.Router();

router.route("/get").get(sizeMaster.getList);
router.route("/bulk-create").post(sizeMaster.bulkCreate);
router.route("/create").post(sizeMaster.create);
router.route("/update").post(sizeMaster.update);

module.exports = router;
