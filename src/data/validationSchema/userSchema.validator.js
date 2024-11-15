const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = { registerSchema };
