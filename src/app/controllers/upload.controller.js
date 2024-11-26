const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { responseHandler } = require("../../core/handlers/response.handlers");
const { uploadService } = require("../service/upload.service");

const upload = async (req, res, next) => {
  try {
    const buffer = req.file?.buffer;
    const body = req.body;
    const deviceToken = req.body.deviceToken;

    const uploadedFileName = req.file?.originalname || "fitcheck_data_file";
    if (!buffer) {
      return responseHandler(
        null,
        res,
        400,
        'Please provide "filename" in query!',
      );
    }

    const data = await uploadService(
      buffer,
      uploadedFileName,
      body,
      deviceToken,
    );

    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (err) {
    console.log("error is ", err);
  }
};

module.exports = { upload };
