const Joi = require("joi");

const registerOneSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  name: Joi.string().required(),
});
const registerTwoSchema = Joi.object({
  password: Joi.string().trim().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

module.exports = { registerOneSchema, loginSchema, registerTwoSchema };
