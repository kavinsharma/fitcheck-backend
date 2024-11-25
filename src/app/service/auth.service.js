const config = require("../../config");
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
const DeviceModel = require("../../data/models/device.model");
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

  value.hash = await generateHash(otp);
  value.code = otp;
  let email = value.email;
  delete value.email;
  const user = await dal.findOneAndUpsert(
    userModel,
    { email: email },
    { name: value.name },
  );
  delete value.name;
  let device_token = value.deviceToken;
  delete value.deviceToken;

  const deviceDetails = await dal.findOneAndUpsert(
    DeviceModel,
    {
      deviceToken: device_token,
    },
    value,
  );

  const baseUrl = config.F_END_BASE_URL;
  const create = await dal.create(otpModel, {
    userId: user._id,
    hash: value.hash,
    code: value.code,
    email: user.email,
    purpose: Purpose.SIGNUP,
  });

  const response = {
    userId: user.userId,
    deviceToken: deviceDetails.deviceToken,
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

  const flag = await compareHash(value.password, user.password);
  if (!flag) {
    throw new CustomError(ResponseMessages.RES_MSG_INVALID_PASSWORD, "400");
  }

  const userData = {
    userId: user._id,
    email: user.email,
    name: user.name,
  };

  if (value?.deviceToken) {
    let device_token = value.deviceToken;
    delete value.deviceToken;

    await dal.findOneAndUpsert(
      DeviceModel,
      {
        deviceToken: device_token,
      },
      {
        deviceToken: device_token,
        userId: user._id,
        long: value.long,
        lat: value.lat,
      },
    );

    userData.deviceToken = value.deviceToken;
  }

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

const create = async body => {
  return await dal.create(model, body);
};

const aggregate = async query => {
  return await dal.aggregate(model, query);
};

const findOne = async (filter, projection = {}) => {
  return await dal.findOne(model, filter, projection);
};
const upsert = async (filter, body) => {
  return await dal.findOneAndUpsert(model, filter, body);
};

const find = async (filter, pagination, sort) => {
  return await dal.find(model, filter, pagination, sort, {});
};

const update = async (filter, body) => {
  return await dal.findOneAndUpdate(model, filter, body);
};

const deleteUser = async id => {
  return await dal.findOneAndUpdate(model, { _id: id }, { active: false });
};

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
