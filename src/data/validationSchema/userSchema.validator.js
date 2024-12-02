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

const basicUserSchema = Joi.object({
  deviceToken: Joi.string(),
  deviceUid: Joi.string(),
  lat: Joi.number(),
  long: Joi.number(),
});

const userDetailsSchema = Joi.object({
  priceRange: Joi.string(),
  name: Joi.string(),
  profileImage: Joi.string().uri(),
  fashionType: Joi.string(),
  age: Joi.number().integer().min(0),
  size: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL"),
  brands: Joi.string(),
  styleType: Joi.string(),
});

const accountDetailsSchema = Joi.object({
  name: Joi.string(),
  // email: Joi.email().trim(),
  dob: Joi.string(),
  // password: Joi.string(),
});

const emailEmailChange = Joi.object({
  newEmail: Joi.string().email(),
  oldEmail: Joi.string().email(),
  password: Joi.string().trim(),
});

const deleteSchema = Joi.object({
  deleteReason: Joi.string(),
  note: Joi.string(),
  password: Joi.string().trim().required(),
});

const familySchema = Joi.object({
  age: Joi.string(),
  profileImage: Joi.string(),
  fashionType: Joi.string(),
  brands: Joi.string(),
  styleType: Joi.string(),
  priceRange: Joi.string(),
  name: Joi.string().required(),
});

const memberStyleSchema = Joi.object({
  styleTypes: Joi.string().required(),
  profileId: Joi.string().required(),
});

module.exports = {
  registerOneSchema,
  loginSchema,
  registerTwoSchema,
  forgetPasswordSchema,
  createPasswordSchema,
  basicUserSchema,
  userDetailsSchema,
  accountDetailsSchema,
  deleteSchema,
  emailEmailChange,
  familySchema,
  memberStyleSchema,
};
