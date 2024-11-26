const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const { responseHandler } = require("../../core/handlers/response.handlers");
const {
  closetService,
  compareService,
  getClosetService,
} = require("../service/closets.service");

const addCloset = async (req, res, next) => {
  try {
    const value = req.value;

    let data = {};
    const deviceData = {
      long: value?.long,
      lat: value?.lat,
      deviceToken: value?.deviceToken,
      deviceUid: value?.deviceUid,
    };
    delete value?.long;
    delete value?.lat;
    delete value?.deviceUid;
    if (req.userData?.deviceToken) {
      value.deviceToken = req.userData.deviceToken;
      data = await closetService(value, deviceData);
    }

    if (req.userData?.userId) {
      value.userId = req.userData.userId;
      data = await closetService(value);
    }
    responseHandler(res, { data }, 200, ResponseMessages.CREATED);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

const comapare = async (req, res, next) => {
  try {
    let value = req.query;
    value = value.productId.split(",");
    const data = await compareService(value);
    responseHandler(res, { data }, 200, "ok");
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

const getCloset = async (req,res,next
) => {
  try {
    const userId= req.userData?.userId
    const deviceToken= req.userData.deviceToken
    const data = await getClosetService({deviceToken:deviceToken,userId:userId});
    responseHandler(res,{data},200,ResponseMessages.OK)
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

module.exports = { addCloset, comapare, getCloset };
