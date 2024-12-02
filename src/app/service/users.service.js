const dal = require("../../data/dal/index");
const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { CustomError } = require("../../core/handlers/error.handlers");
const userModel = require("../../data/models/user.model");

const {
  BasicDetailsModel,
} = require("../../data/models/userBasicDetails.model");
const DeviceModel = require("../../data/models/device.model");
const { familyModel } = require("../../data/models/family.model");

const getProfileService = async (userId, deviceToken) => {
  const device = await dal.findOne(DeviceModel, { deviceToken: deviceToken });
  const data = await dal.findOne(BasicDetailsModel, {
    $or: [{ userId: userId }, { deviceId: device._id }],
  });
  let userData;
  if (userId) {
    userData = await dal.findByID(userModel, { _id: userId });
  }

  return {
    name: userData?.name,
    profileImage: data.profileImage,
    priceRange: data.priceRange,
    fashionType: data.fashionType,
    age: data.age,
    size: data.size,
    membership: data.membership,
    brands: data.brands,
    styleType: data.styleType,
  };
};

const basicDetailsService = async (value, userId, deviceToken) => {
  let deviceData = {};
  let userData = {};
  if (deviceToken) {
    deviceData = await dal.findOneAndUpsert(
      DeviceModel,
      {
        deviceToken: deviceToken,
      },
      { deviceToken: deviceToken },
    );

    value.deviceId = deviceData?._id;
  }

  if (userId) {
    userData = await dal.findOne(userModel, { _id: userId });
    if (value.name) {
      userData = await dal.findOneAndUpsert(
        userModel,
        { _id: userId },
        { name: value.name },
      );
      value.userId = userData._id;
    }
  }
  let data = {};
  if (userData?._id) {
    delete value.userId;
    data = await dal.findOneAndUpsert(
      BasicDetailsModel,

      { userId: userData._id },

      value,
    );
  } else {
    delete value?.deviceId;
    data = await dal.findOneAndUpsert(
      BasicDetailsModel,

      { deviceId: deviceData._id },

      value,
    );
  }

  return {
    name: userData?.name,
    sytleType: data.sytleType,
    size: data.size,
    age: data.age,
    profileImage: data.profileImage,
  };
};

const styleUpdateService = async (userId, deviceToken, value) => {
  let deviceData = {};
  if (deviceToken) {
    deviceData = await dal.findOne(DeviceModel, { deviceToken: deviceToken });
  }
  const check = await dal.findOne(BasicDetailsModel, {
    $or: [{ deviceToken: deviceData }, { userId: userId }],
  });
  let data = {};

  if (check) {
    let newStyleTypes = value?.styleType?.split(",").map(style => style.trim());

    let currentStyleTypes = check.styleType || [];

    const combinedStyleTypes = [
      ...new Set([...newStyleTypes, ...currentStyleTypes]),
    ];

    const finalStyleTypes = combinedStyleTypes.slice(0, 3);

    data = await dal.findOneAndUpsert(
      BasicDetailsModel,
      { _id: check._id },
      { $set: { styleType: finalStyleTypes } },
    );
  }

  return { styleType: data.styleType };
};

const brandUpdateService = async (userId, deviceToken, value) => {
  let deviceData = {};
  if (deviceToken) {
    deviceData = await dal.findOne(DeviceModel, { deviceToken: deviceToken });
  }
  const check = await dal.findOne(BasicDetailsModel, {
    $or: [{ deviceToken: deviceData }, { userId: userId }],
  });
  let data = {};

  if (check) {
    let newBrand = value?.brands?.split(",").map(brand => brand.trim());

    let currentBrand = check.brands || [];

    const combinedBrands = [...new Set([...newBrand, ...currentBrand])];

    const finalBrand = combinedBrands.slice(0, 5);

    data = await dal.findOneAndUpsert(
      BasicDetailsModel,
      { _id: check._id },
      { $set: { brands: finalBrand } },
    );
  }

  return { brands: data.brands };
};

const accountDetailsService = async (userId, value) => {
  let deviceData = {};
  if (!userId) {
    deviceData = await dal.findOne(DeviceModel, { deviceToken: deviceToken });
  }

  const data = await dal.findOneAndUpsert(
    userModel,
    {
      _id: userId,
    },
    { name: value.name, dob: value.dob },
  );
  return { name: value.name, dob: value.dob };
};

const addMemberService = async (value, userId) => {
  const user = await dal.findOneAndUpdate(
    userModel,
    { _id: userId },
    { family: true },
  );
  if (!user) {
    throw new CustomError(ResponseMessages.RES_MSG_USER_NOT_FOUND_EN, "400");
  }
  const data = await dal.create(familyModel, {
    userId: userId,
    name: value.name,
  });
  value.userId = data._id;
  let styleType = value?.styleType?.split(",").slice(0, 3);
  let brands = value?.brands?.split(",").slice(0, 5);
  value.styleType = styleType;
  value.brands = brands;
  const response = await dal.create(BasicDetailsModel, value);

  return { name: data.name, userId: response.userId };
};

const otherStyleUpdateService = async value => {
  const check = await dal.findOne(BasicDetailsModel, {
    userId: value.profileId,
  });
  let data = {};

  let newStyleTypes = value?.styleType?.split(",").map(style => style.trim());

  let currentStyleTypes = check?.styleType || [];

  const combinedStyleTypes = [
    ...new Set([...newStyleTypes, ...currentStyleTypes]),
  ];

  const finalStyleTypes = combinedStyleTypes.slice(0, 3);

  data = await dal.findOneAndUpsert(
    BasicDetailsModel,
    { userId: value.profileId },
    { $set: { styleType: finalStyleTypes } },
  );

  return { styleType: data.styleType };
};
const otherbrandsUpdateService = async value => {
  const check = await dal.findOne(BasicDetailsModel, {
    userId: value.profileId,
  });

  let data = {};

  let newStyleTypes = value?.brands?.split(",").map(style => style.trim());

  let currentStyleTypes = check?.brands || [];

  const combinedStyleTypes = [
    ...new Set([...newStyleTypes, ...currentStyleTypes]),
  ];

  const finalStyleTypes = combinedStyleTypes.slice(0, 5);

  data = await dal.findOneAndUpsert(
    BasicDetailsModel,
    { userId: value.profileId },
    { $set: { brands: finalStyleTypes } },
  );

  return { brands: data.brands };
};

module.exports = {
  basicDetailsService,
  getProfileService,
  styleUpdateService,
  brandUpdateService,
  accountDetailsService,
  addMemberService,
  otherStyleUpdateService,
  otherbrandsUpdateService,
};
