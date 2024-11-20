const AWS = require("aws-sdk");
const { config } = require("../../config");

const sns = new AWS.SNS({
  region: config.AWS_SES_REGION,
  accessKeyId: config.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SES_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({
  region: config.AWS_SES_REGION,
  accessKeyId: config.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SES_SECRET_ACCESS_KEY,
});

module.exports = { sns, ses };
