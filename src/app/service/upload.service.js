const {
  uploadGeneralFile,
} = require("../../core/handlers/fileUpload.handlers");
const DeviceModel = require("../../data/models/device.model");
const AssestsModel = require("../../data/models/assests.model");
const dal = require("../../data/dal/index");

const uploadService = async (buffer, uploadedFileName, body) => {
  const url = await uploadGeneralFile(buffer, uploadedFileName);
  let deviceToken = body.deviceToken;
  delete body.deviceToken;

  const data = await dal.findOneAndUpsert(
    DeviceModel,
    {
      deviceToken: deviceToken,
    },
    body,
  );

  await dal.create(AssestsModel, {
    deviceId: data._id,
    media: url,
  });
  const response = {
    url: url,
    deviceToken: data.deviceToken,
  };

  return response;
};

module.exports = { uploadService };
