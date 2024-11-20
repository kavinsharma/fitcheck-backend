const { ResponseMessages } = require("../../core/constants/cloud.constants");
const Purpose = require("../../core/enum/auth.enum");
const { CustomError } = require("../../core/handlers/error.handlers");
const {
  generateHash,
  generateOtpCode,
  generateAccessToken,
  generateRefreshToken,
} = require("../../core/utils/utils");
const dal = require("../../data/dal");
const refreshTokenModel = require("../../data/models/refreshToken.model");
const userModel = require("../../data/models/user.model");

const userSignup = async value => {
  value.password = await generateHash(value.password);

  let count;

  count = await dal.find(
    userModel,
    { email: value.email, emailVerified: true },
    { limit: 1 },
    { email: 1 },
  );
  if (value.email && count.length > 0 && count[0].email) {
    throw new CustomError(
      ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
      "400",
    );
  }
  const create = await dal.create(userModel, value);
  const otp = generateOtpCode();

  const response = {
    userId: create.userId,
    code: otp,
    userName: create.userName,
    purpose: Purpose.SIGNUP,
    email: create.email,
  };
  return response;
};

const loginService = async value => {
  const user = await dal.findOne(userModel, {
    email: value.email,
    emailVerified: true,
  });

  if (!user) {
    throw new CustomError(ResponseMessages.RES_MSG_USER_NOT_FOUND_EN, "400");
  }
  const userData = {
    userId: user._id,
    email: user.email,
    userName: user.userName,
  };

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);
  let refreshBody = {
    userId: user._id,
    token: refreshToken,
  };
  await dal.findOneAndUpsert(
    refreshTokenModel,
    { userId: user._id },
    refreshBody,
  );

  return {
    accessToken: accessToken,
    userData,
  };
};
module.exports = { userSignup, loginService };
