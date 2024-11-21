const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { Purpose } = require("../../core/enum/auth.enum");
const { CustomError } = require("../../core/handlers/error.handlers");
const {
  generateHash,
  generateOtpCode,
  generateAccessToken,
  generateRefreshToken,
} = require("../../core/utils/utils");
const dal = require("../../data/dal");
const otpModel = require("../../data/models/otp.model");
const refreshTokenModel = require("../../data/models/refreshToken.model");
const userModel = require("../../data/models/user.model");
const model = require("../../data/models/user.model");

const userSignup = async value => {
  const userData = await dal.findOne(userModel, { email: value.email });
  if (userData?.email && userData?.emailVerified) {
    throw new CustomError(
      ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
      "400",
    );
  }

  const otp = generateOtpCode();
  console.log("🚀 ~ userSignup ~ otp:", otp);

  value.hash = await generateHash(otp);
  value.code = otp;

  const user = await dal.findOneAndUpsert(
    userModel,
    { email: value.email },
    { name: value.name },
  );
  console.log("🚀 ~ userSignup ~ user:", user);
  const baseUrl = "http://localhost:8080/api/v1/auth/verify?hash=";
  const create = await dal.create(otpModel, {
    userId: user._id,
    hash: value.hash,
    code: value.code,
    email: value.email,
    purpose: Purpose.SIGNUP,
  });

  const response = {
    userId: user.userId,
    name: user.name,
    hash: baseUrl + create.hash,
    purpose: Purpose.SIGNUP,
    email: user.email,
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
    name: user.name,
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

const verifyService = async value => {
  console.log("🚀 ~ verifyService ~ value:", value);
  const otpData = await dal.findOneAndDelete(otpModel, {
    email: value.email,
    purpose: value.purpose,
  });

  if (!otpData) {
    throw new CustomError(ResponseMessages.RES_MSG_INVALID_TOKEN_EN, "401");
  }
  const user = await dal.findOneAndUpdate(
    userModel,
    { _id: otpData.userId, email: otpData.email },
    { emailVerified: true },
  );

  const userData = {
    userId: user._id,
    email: user.email,
    name: user.name,
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

const userDetailsService = async (userId, value) => {
  const user = await dal.findByID(userModel, userId);
  if (!user) {
    throw new CustomError(ResponseMessages.RES_MSG_USER_NOT_FOUND_EN, "404");
  }
  if (!user.emailVerified) {
    throw new CustomError(ResponseMessages.RES_MSG_USER_NOT_VERIFIED_EN, "401");
  }
  value.password = await generateHash(value.password);
  value.active = true;
  const userData = await dal.findOneAndUpsert(
    userModel,
    { _id: userId },
    value,
  );
  return {
    name: userData.name,
    email: userData.email,
  };
};

const create = async (body) => {
  return await dal.create(model, body);
};

const aggregate = async (query) => {
  return await dal.aggregate(model, query);
};

const findOne = async (filter, projection = {}) => {
  return await dal.findOne(model, filter, projection);
}
const upsert = async (filter, body) => {
  return await dal.findOneAndUpsert(model, filter, body);
}

const find = async (filter, pagination, sort) => {
  return await dal.find(model, filter, pagination, sort, {});
};

const update = async (filter, body) => {
  return await dal.findOneAndUpdate(model, filter, body);
};

const deleteUser = async (id) => {
  return await dal.findOneAndUpdate(model, { _id: id }, { active: false });
}

module.exports = {
  userSignup,
  loginService,
  verifyService,
  userDetailsService,
  create,
  aggregate,
  findOne,
  find,
  upsert,
  update,
  deleteUser,
};
