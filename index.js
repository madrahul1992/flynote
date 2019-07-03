// load environment variables
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const reqUniqID = require('./middlewares/req-uniq-id');
const routes = require('./routes');
const logger = require('./utils/logger');
const mongodb = require('./lib/db');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(reqUniqID);

app.use(morgan('tiny', {stream: logger.stream}));

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message
  });
});

app.listen(port, () => {
  logger.info(`Server is running on ${port}`);
});

module.exports = app;