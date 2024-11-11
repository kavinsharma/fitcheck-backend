const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const { getList } = require("../controllers/product.controller.js");
const router = express.Router();

router.route("/search").get(getList);

module.exports = router;
