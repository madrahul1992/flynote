const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');

const mongodb = process.env.MONGODB_URI || config.get('mongodb');

mongoose.connection
.once('open', logger.info.bind(logger, 'Connnected with mongo database'))
.on('error', logger.error.bind(logger, 'connection error:: '));

mongoose.connect(mongodb, {
  useCreateIndex: true, 
  useNewUrlParser: true
});