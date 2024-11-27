const {
  uploadGeneralFile,
} = require("../../core/handlers/fileUpload.handlers");
const DeviceModel = require("../../data/models/device.model");
const AssestsModel = require("../../data/models/assests.model");
const {
  BasicDetailsModel,
} = require("../../data/models/userBasicDetails.model");
const dal = require("../../data/dal/index");

const uploadService = async (buffer, uploadedFileName, body, device_token) => {
  const url = await uploadGeneralFile(buffer, uploadedFileName);

  delete body.deviceToken;

  const data = await dal.findOneAndUpsert(
    DeviceModel,
    {
      deviceToken: device_token,
    },
    body,
  );

  await dal.findOneAndUpsert(
    BasicDetailsModel,
    { deviceId: data._id },
    { profileImage: url },
  );
  const response = {
    url: url,
    deviceToken: data.deviceToken,
  };

  return response;
};

module.exports = { uploadService };
