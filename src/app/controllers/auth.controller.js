const config = require("../../config");
const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");
const errorHandlerMiddleware = require("../../core/handlers/mongooseError.handler");
const { responseHandler } = require("../../core/handlers/response.handlers");
const { generateAccessToken } = require("../../core/utils/utils");
const {
  userSignup,
  loginService,
  verifyService,
  userDetailsService,
  create,
  upsert
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

const oauthCallback = async (req, res) => {
  try {
    const body = {
      "name": req.user?.displayName,
      status: "active",
      emailVerified: true,
      verifiedUser: true,
      active: true,
      imageUrl: req.user?.picture
    }
    const userInDb = await upsert({ email: req.user.email }, body);
    const redirectUrl = await getUserRedirect(userInDb)
    console.log("🚀 ~ oauthCallback ~ getUserRedirect(userInDb):", redirectUrl)
    res.redirect(redirectUrl);
  } catch (err) {
    console.log("error", err);
    res.redirect(getUserRedirect(null, err.message));
  }
};

const getUserRedirect = async (userInDb, err = null) => {
  if (err) {
    return `${config.GOOGLE_CALLBACK_URL_UAT}/handleAuth?error=${err}`;
  }
  const body = { userId: userInDb._id, email: userInDb.email, name: userInDb.name }
  token = generateAccessToken(body);
  const response = {
    message: "User Logged In Successfully",
    data: userInDb,
    error: null,
    token: token,
  };
  return `${config.F_END_BASE_URL}?userToken=${token}&userId=${userInDb._id}&userEmail=${userInDb.email}&error=${response.error}`;
};


module.exports = { register, login, userDetails, verifyHash, oauthCallback };
