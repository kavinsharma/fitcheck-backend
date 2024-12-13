const {
  basicDetailsService,
  styleUpdateService,
  brandUpdateService,
  accountDetailsService,
  addMemberService,
  otherStyleUpdateService,
  otherbrandsUpdateService,
} = require("../service/users.service");
const { getProfileService } = require("../service/users.service");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const { responseHandler } = require("../../core/handlers/response.handlers");
const {
  getErrorMessage,
  getErrorCode,
} = require("../../core/handlers/error.handlers");
const { ResponseMessages } = require("../../core/constants/cloud.constants");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.userData?.userId;

    const deviceToken = req.userData?.deviceToken;

    const data = await getProfileService(userId, deviceToken);
    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};
const basicUserDetails = async (req, res, next) => {
  try {
    const value = req.value;
    const userId = req.userData?.userId;
    const deviceToken = req.userData?.deviceToken;
    value.styleType = value?.styleType?.split(",");
    value.brands = value?.brands?.split(",");

    const data = await basicDetailsService(value, userId, deviceToken);
    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_UPDATED_SUCCESSFULLY_EN,
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

const updateStyleType = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.userData.userId;

    const deviceToken = req.userData.deviceToken;

    const data = await styleUpdateService(userId, deviceToken, value);

    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};
const updateBrandType = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.userData?.userId;

    const deviceToken = req.userData.deviceToken;

    const data = await brandUpdateService(userId, deviceToken, value);

    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

const accountDetails = async (req, res, next) => {
  try {
    const value = req.value;

    const userId = req.userData?.userId;
    const data = await accountDetailsService(userId, value);
    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_UPDATED_SUCCESSFULLY_EN,
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

const addMember = async (req, res, next) => {
  try {
    const value = req.value;
    const userId = req.userData.userId;
    const data = await addMemberService(value, userId);

    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_NEW_PROFILE_ADDED_SUCCESSFULLY_EN,
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

const updateOtherStyleType = async (req, res, next) => {
  try {
    const value = req.value;
    const data = await otherStyleUpdateService(value);
    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

const updateOtherBrands = async (req, res, next) => {
  try {
    const value = req.value;

    const data = await otherbrandsUpdateService(value);

    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};
module.exports = {
  getProfile,
  basicUserDetails,
  updateStyleType,
  updateBrandType,
  accountDetails,
  addMember,
  updateOtherStyleType,
  updateOtherBrands,
};
