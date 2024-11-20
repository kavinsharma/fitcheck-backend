const { ResponseMessages } = require("../../core/constants/cloud.constants");
const {
  generatePublicS3FileUrl,
} = require("../../core/handlers/fileUpload.handlers");
const { responseHandler } = require("../../core/handlers/response.handlers");

const upload = async (req, res, next) => {
  try {
    const fileName = req.query.filename;
    console.log("🚀 ~ upload ~ fileName:", fileName);
    if (!fileName) {
      return responseHandler(
        null,
        res,
        'Please provide "filename" in query!',
        400,
      );
    }

    const url = await generatePublicS3FileUrl(fileName);
    responseHandler(res, { ...url }, 200, ResponseMessages.OK);
  } catch (err) {
    console.log("error is ", err);
  }
};

module.exports = { upload };
