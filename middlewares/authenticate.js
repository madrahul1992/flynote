const createError = require('http-errors');
const logger = require('../utils/logger');
const redis = require('../lib/redis');

// TODO: Use passport local to do basic authentication

module.exports = async (req, res, next) => {
  const user = req.headers.authorization;
  logger.info('user:: ', { user });
  try {
    if (user) {
      const isUser = await redis.getAsync(user);
      if (isUser) {
        next();
      } else {
        next(createError(401, 'Wrong credentials, Please try again'));
      }
    } else {
      next(createError(400, 'Bad Request'));
    }
  } catch (err) {
    logger.error('Error in authentication:: ', {
      message: err.message, user
    });
    next(500, createError('Something went wrong, Please try again later'));
  }
}