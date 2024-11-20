const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  generatePublicS3FileUrl,
  uploadGeneralFile,
} = require("../../core/handlers/fileUpload.handlers");
const { responseHandler } = require("../../core/handlers/response.handlers");

const upload = async (req, res, next) => {
  try {
    const buffer = req.file.buffer;

    const uploadedFileName = req.file.originalname;
    if (!buffer) {
      return responseHandler(
        null,
        res,
        'Please provide "filename" in query!',
        400,
      );
    }

    const url = await uploadGeneralFile(buffer, uploadedFileName);
    responseHandler(res, { url }, 200, ResponseMessages.OK);
  } catch (err) {
    console.log("error is ", err);
  }
};

module.exports = { upload };
