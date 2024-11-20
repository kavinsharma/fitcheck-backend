const config = require("../../config");
const Error = require("./error.handlers");

var AWS = require("aws-sdk");

let bucketName = config.S3_PUBLIC_BUCKET_NAME;
var credentials = {
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
};
AWS.config.update({
  credentials: credentials,
  region: config.AWS_REGION,
});
var s3 = new AWS.S3();

const generatePublicS3FileUrl = async fileName => {
  let file_name =
    "journals/" +
    Date.now() +
    "-fitcheck-" +
    Math.floor(Math.random() * 100 + 1) +
    "." +
    fileName.split(".").pop();

  let inputParams = {
    Bucket: bucketName,
    Expires: 300,
    Fields: {
      key: file_name,
    },
    conditions: [
      { ACL: "public-read" },
      { bucket: bucketName },
      { success_action_status: "200" },
      ["starts-with", "$key", ""],
      ["content-length-range", 0, 1024 * 1024 * 15],
      { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
    ],
  };

  return await s3.createPresignedPost(inputParams);
};

const deleteFile = async fileName => {
  let s3Url = process.env.AWS_BASE_URL;

  var key = fileName.substring(s3Url.length);
  console.log("key is ", key);
  var params = {
    Bucket: bucketName,
    Key: key,
  };
  try {
    var response = await s3.deleteObject(params).promise();
    console.log("file deleted Successfully");
  } catch (err) {
    console.log("ERROR in file Deleting : " + JSON.stringify(err));
    throw err;
  }
  return response;
};

const uploadGeneralFile = async (buffer, fileName) => {
  let file_name =
    "fitcheck/" +
    Date.now() +
    "-fitcheck-" +
    Math.floor(Math.random() * 100 + 1) +
    "." +
    fileName.split(".").pop();

  const params = {
    Bucket: bucketName,
    Key: `${file_name}`,
    Body: buffer,
  };

  const response = await s3.upload(params).promise();
  console.log("File uploaded successfully.", response.Location);
  return response.Location;
};
module.exports = { deleteFile, generatePublicS3FileUrl, uploadGeneralFile };
