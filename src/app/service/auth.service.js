const { ResponseMessages } = require("../../core/constants/cloud.constants");
const Purpose = require("../../core/enum/auth.enum");
const { CustomError } = require("../../core/handlers/error.handlers");
const { generateHash, generateOtpCode } = require("../../core/utils/utils");
const dal = require("../../data/dal");
const userModel = require("../../data/models/user.model");

const userSignup = async value => {
  value.password = await generateHash(value.password);

  let count;

  count = await dal.find(
    userModel,
    { email: value.email, active: true },
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

module.exports = { userSignup };
