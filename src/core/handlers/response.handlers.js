const { Response } = require("express");

const responseHandler = (res, body, status = 200, message = "") => {
  const returnBody = {
    ...body,
    status: status || 200,
    message: message,
  };
  return res.status(status).json(returnBody);
};

module.exports = { responseHandler };
