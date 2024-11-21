const { responseHandler } = require("../../core/handlers/response.handlers");

const defaults = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const validate = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, defaults);
    if (error) {
      return responseHandler(res, error, error.message, 422);
    }
    req.value = value;
    next();
  };
};

module.exports = validate;
