const Joi = require("joi");

const registerOneSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  name: Joi.string().required(),
  deviceToken: Joi.string(),
  deviceUid: Joi.string(),
  lat: Joi.number(),
  long: Joi.number(),
});

const registerTwoSchema = Joi.object({
  password: Joi.string().trim().required(),
});
const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
const createPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
  deviceToken: Joi.string(),
  deviceUid: Joi.string(),
  lat: Joi.number(),
  long: Joi.number(),
});

module.exports = {
  registerOneSchema,
  loginSchema,
  registerTwoSchema,
  forgetPasswordSchema,
  createPasswordSchema,
};
