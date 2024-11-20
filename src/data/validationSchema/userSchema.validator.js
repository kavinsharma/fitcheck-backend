const Joi = require("joi");

const registerOneSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});
const registerTwoSchema = Joi.object({
  password: Joi.string().trim().required(),
  phoneNumber: Joi.string().required().trim(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

module.exports = { registerOneSchema, loginSchema, registerTwoSchema };
