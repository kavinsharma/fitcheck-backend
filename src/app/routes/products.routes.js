const express = require("express");
const { ResponseMessages } = require("../../core/constants/cloud.constants.js");
const {
  getList,
  getProductDetails,
} = require("../controllers/product.controller.js");
const router = express.Router();

router.route("/search").get(getList);
router.route("/price-check/:productId").get(getProductDetails);

module.exports = router;
