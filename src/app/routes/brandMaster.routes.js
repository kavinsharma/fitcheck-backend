const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const brands = require("../controllers/brands.controller.js");
const router = express.Router();

router.route("/get").get(brands.getList);
router.route("/bulk-create").post(brands.bulkCreate);
router.route("/create").post(brands.create);
router.route("/update").post(brands.update);

module.exports = router;
