const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const generateOtpCode = (length = 4) => {
  let randomCode = Math.floor(Math.random() * Math.pow(10, length)).toString();

  if (randomCode.length < length) {
    randomCode = randomCode.padStart(length, "0");
  }
  return randomCode;
};

const generateHash = async input => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(input, salt);

  return hash;
};

const compareHash = async (input, hash) => {
  const match = await bcrypt.compare(input, hash);
  return match;
};

const generateAccessToken = user => {
  const token = jwt.sign(user, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const generateRefreshToken = user => {
  const token = jwt.sign(user, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const decodeUserToken = token => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = {
  generateOtpCode,
  generateHash,
  compareHash,
  generateAccessToken,
  generateRefreshToken,
  decodeUserToken,
};
