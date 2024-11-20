const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const { responseHandler } = require("../../core/handlers/response.handlers");
const { userSignup, loginService } = require("../service/auth.service");

const register = async (req, res, next) => {
  try {
    const value = req.value;

    const data = await userSignup(value);
    req.value.code = data.code;

    responseHandler(
      res,
      { data },
      200,
      ResponseMessages.RES_MSG_USER_CODE_SENT_SUCCESSFULLY_EN,
    );
    next();
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

module.exports = { register, login, userDetails };
