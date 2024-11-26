const { decodeUserToken } = require("../../core/utils/utils");
const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { responseHandler } = require("../../core/handlers/response.handlers");
const {
  CustomError,
  getErrorCode,
  getErrorMessage,
} = require("../../core/handlers/error.handlers");

const verifyToken = async (req, res, next) => {
  try {
    const deviceToken = req.header("deviceToken");
    const token = req.header("access-token")?.replace("Bearer", "").trim();

    if (deviceToken) {
      req.userData = { deviceToken };
      return next();
    }

    if (!token) {
      throw new CustomError(
        "Invalid token",
        ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
      );
    }

    const decodedData = decodeUserToken(token);
    if (!decodedData) {
      return responseHandler(
        res,
        null,
        401,
        ResponseMessages.RES_MSG_INVALID_TOKEN_EN,
      );
    }

    req.userData = decodedData;
    next();
  } catch (error) {
    const code = getErrorCode(error);
    const message = getErrorMessage(error);
    return responseHandler(res, null, code, message);
  }
};

module.exports = { verifyToken };
