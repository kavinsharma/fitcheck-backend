const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const getConfig = () => {
  return {
    DB_NAME: process.env.DB_NAME ? process.env.DB_NAME : "",
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL
      ? process.env.MONGODB_CONNECTION_URL
      : "",

    S3_PUBLIC_BUCKET_NAME: process.env.S3_PUBLIC_BUCKET_NAME,
    COOKIE_KEY: process.env.COOKIE_KEY,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    F_END_BASE_URL: process.env.F_END_BASE_URL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL_LOCAL: process.env.GOOGLE_CALLBACK_URL_LOCAL
      ? process.env.GOOGLE_CALLBACK_URL_LOCAL
      : "",
    GOOGLE_CALLBACK_URL_UAT: process.env.GOOGLE_CALLBACK_URL_UAT
      ? process.env.GOOGLE_CALLBACK_URL_UAT
      : "",
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    AWS_SENDERS_EMAIL: process.env.AWS_SENDERS_EMAIL,
    JWT_SECRET: process.env.JWT_SECRET,
    SEED_ADMIN_USERNAME: process.env.SEED_ADMIN_USERNAME,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
    SERPAPI_SECRET_KEY: process.env.SERPAPI_SECRET_KEY,
    SERPAPI_BASE_URL: process.env.SERPAPI_BASE_URL,
    APPLE_CLIENT_I: process.env.APPLE_CLIENT_ID,
    APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
    APPLE_KEY_ID: process.env.APPLE_KEY_ID,
    APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
    APPLE_CALLBACK_URL: process.env.APPLE_CALLBACK_URL,
    STMP_EMAIL: process.env.STMP_EMAIL,
    STMP_PASSWORD: process.env.STMP_PASSWORD,
    STMP_APP_CODE: process.env.STMP_APP_CODE,
  };
};

const config = getConfig();

module.exports = config;
