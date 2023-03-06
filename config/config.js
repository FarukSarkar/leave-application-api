require('dotenv').config();

module.exports = {
  uri: process.env.URI,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  authSource: process.env.MONGO_AUTHSOURCE,
  secretKey: process.env.SECRET_KEY,
};
