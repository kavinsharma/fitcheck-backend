const { ResponseMessages } = require("../../core/constants/cloud.constants");
const { responseHandler } = require("../../core/handlers/response.handlers");
const { uploadService } = require("../service/upload.service");

const upload = async (req, res, next) => {
  try {
    const buffer = req.file.buffer;
    const body = req.body;

    const uploadedFileName = req.file.originalname;
    if (!buffer) {
      return responseHandler(
        null,
        res,
        'Please provide "filename" in query!',
        400,
      );
    }

    const data = await uploadService(buffer, uploadedFileName, body);

    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (err) {
    console.log("error is ", err);
  }
};

module.exports = { upload };
