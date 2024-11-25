const Joi = require("joi");

const closetItemSchema = Joi.object({
  productId: Joi.string().required(),
  deviceId: Joi.string().optional(),
  deviceToken: Joi.string().optional(),
  imageUrl: Joi.string().uri().required(),
  userImage: Joi.string().uri().optional(),
  title: Joi.string().optional(),
  deviceUid: Joi.string().trim(),
  lat: Joi.number(),
  long: Joi.number(),
  description: Joi.string().optional(),
  status: Joi.string().valid("active", "archived").default("active"),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = { closetItemSchema };
