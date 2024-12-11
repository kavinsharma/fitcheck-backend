const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const { responseHandler } = require("../../core/handlers/response.handlers");
const { serapiSearchHandler } = require("../../core/utils/searchHandler.utils");
const {
  dynamicFilters,
  productSearch,
  priceFilter,
} = require("../../core/utils/api.utils");

const getList = async (req, res, next) => {
  try {
    const params = req.query;
    const minPrice = req?.query?.minPrice;
    let data = await serapiSearchHandler({
      brands: params?.brands,
      maxPrice: params?.maxPrice,
      minPrice: params?.minPrice,
      sex: params?.sex,
      age: params?.age,
    });
    let filterData = {};
    if (params.color) {
      filterData = await dynamicFilters(data, "Color", params.color);
    }
    if (params.size) {
      filterData = await dynamicFilters(filterData, "Size", params.size);
    }

    if (minPrice) {
      filterData = await priceFilter(data, minPrice);
    }

    responseHandler(
      res,
      { data: filterData ?? data },
      200,
      ResponseMessages.FOUND,
    );
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const data = await productSearch(productId);
    responseHandler(res, data, 200, ResponseMessages.OK);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

module.exports = { getList, getProductDetails };
