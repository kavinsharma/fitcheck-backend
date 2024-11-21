const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const { responseHandler } = require("../../core/handlers/response.handlers");
const {
  userSignup,
  loginService,
  verifyService,
  userDetailsService,
} = require("../service/auth.service");

const register = async (req, res, next) => {
  try {
    const value = req.value;
    console.log("🚀 ~ register ~ value:", value);

    const data = await userSignup(value);

    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_CODE_SENT_SUCCESSFULLY_EN,
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

const userDetails = async (req, res, next) => {
  try {
    const user = req.userData;
    const value = req.value;

    const data = await userDetailsService(user.userId, value);
    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_UPDATED_SUCCESSFULLY_EN,
    );
    console.log("🚀 ~ userDetails ~ value:", value);
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

const login = async (req, res, next) => {
  try {
    const value = req.value;

    const userData = await loginService(value);

    responseHandler(
      res,
      userData,
      200,
      ResponseMessages.RES_MSG_USER_LOGIN_SUCCESSFULLY_EN,
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

const verifyHash = async (req, res, next) => {
  try {
    const value = req.body;

    const data = await verifyService(value);
    responseHandler(res, data, 200, "User Verfied ");
  } catch (error) {
    const errorMongoose = errorHandlerMiddleware(error, res);
    let code = errorMongoose.statusCode;
    let message = errorMongoose.msg;
    code = getErrorCode(error);
    message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};
module.exports = { register, login, userDetails, verifyHash };
