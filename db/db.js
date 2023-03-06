const mongoose = require('mongoose');
const config = require('../config/config');

module.exports.initializeMongoDB = async function () {
  try {
    await mongoose.connect(config.uri, {
      authSource: config.authSource,
      user: config.username,
      pass: config.password,
    });
    console.log('Successfully Connected to MongoDB!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
