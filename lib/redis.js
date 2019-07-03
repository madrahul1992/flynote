const redis = require('redis');
const bluebird = require('bluebird');
const config = require('config');
const logger = require('../utils/logger');
const { host, port, db } = config.get('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisClient = redis.createClient({ 
    host, port, db,     
    // retry_strategy: (options) => {
    //   if (options.attempt >= 3) {
    //     // End reconnecting after a specific number of tries and flush all commands with a individual error
    //     return new Error('Retry attempts exhausted');
    //   }
    //   // reconnect after
    //   return 10000;
    // }
  }, 
);

redisClient.on('connect', function () {
  logger.info('Connected to redis');
});

redisClient.on('error', function (err) {
  logger.error('Redis error:: ', {
    message: err.message,
    stack: err.stack
  });
});

module.exports = redisClient;
