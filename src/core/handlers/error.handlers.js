const { HttpStatusCodes } = require("../../core/constants/cloud.constants");

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const getErrorMessage = e => {
  let message = "";
  if (typeof e === "string") {
    message = e.toUpperCase();
  } else if (e instanceof Error) {
    message = e.message;
  }
  return message;
};

const getErrorCode = e => {
  let code;
  if (e instanceof Error) {
    code = e.code;
  }
  if (!code) {
    return 400;
  }
  return (HttpStatusCodes || {})[code] || 400;
};

const getFirebaseErrorCode = e => {
  let code;
  if (e instanceof Error) {
    code = e.code;
  }
  return code || "INVALID_REQ_TYPE";
};

module.exports = {
  CustomError,
  getErrorMessage,
  getErrorCode,
  getFirebaseErrorCode,
};
