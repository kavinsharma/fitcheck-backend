const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { CustomError } = require("../../core/handlers/error.handlers");
const dal = require("../../data/dal/index");
const ClosetModel = require("../../data/models/closets.model");
const DeviceModel = require("../../data/models/device.model");

const closetService = async (value, deviceData) => {
  const data = await dal.findOne(ClosetModel, {
    productId: value.productId,
    deviceToken: value.deviceToken,
  });
  console.log("🚀 ~ closetService ~ data:", data);
  if (data) {
    throw new CustomError(
      ResponseMessages.RES_USER_PRODUCT_ALREADY_EXISTS,
      "400",
    );
  }
  let deviceToken = deviceData.deviceToken;
  delete deviceData.deviceToken;
  const deviceRes = await dal.findOneAndUpsert(
    DeviceModel,
    {
      deviceToken: deviceToken,
    },
    deviceData,
  );

  value.deviceId = deviceRes._id;
  const response = await dal.create(ClosetModel, value);

  return {
    image: response.imageUrl,
    userImage: response.userImage,
    productId: response.productId,
  };
};

const compareService = async value => {
  const data = await dal.find(
    ClosetModel,
    {
      productId: { $in: value },
    },
    {},
    {},
    { productId: 1, imageUrl: 1, userImage: 1, _id: 0 },
  );

  if (!data) {
    throw new CustomError("product Not present", "400");
  }

  return data;
};

const getClosetService = async filter => {
  const data = await dal.find(ClosetModel, {
    $or: [{ userId: filter.userId }, { productId: filter.productId }],
  });
  return data;
};

module.exports = { closetService, compareService, getClosetService };
