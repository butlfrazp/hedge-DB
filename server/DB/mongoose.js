const MLab = require('../../config/credentials');
const mongoose = require('mongoose');

const DB_URL = MLab.DB_URL;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || DB_URL);

module.exports = {
  mongoose
};
