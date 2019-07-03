const winston = require('winston');
require('winston-daily-rotate-file');
const {existsSync, mkdirSync} = require('fs');
const config = require('config');
const { combine, timestamp, label, colorize, json, printf } = winston.format;
const getNamespace = require('cls-hooked').getNamespace;
const session = getNamespace('session');

const dir = process.env.LOGPATH || config.get('log.dir');

if (!existsSync(dir)) {
  mkdirSync(dir, '777', (err) => {
    if (err) console.log(err);
  });
}

const fileTransport = new (winston.transports.DailyRotateFile)({
  filename: 'expression-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  dirname: dir,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

const print = printf(({ level, message, label, timestamp, ...meta }) => {
  const reqId = session.get('uniqId') ? (' reqId: - ' + session.get('uniqId')) : '';
  return `${timestamp} [${label}] ${reqId} ${level}: ${message}` +
  ` ${!(Object.keys(meta).length === 0 && meta.constructor === Object) ? JSON.stringify(meta) : ''}`;
});

let winstonLogger = winston.createLogger({
  format: combine(
    label({ label: 'mathms' }),
    timestamp(),
    json(),
    colorize(),
    print
  ),
  transports: [
    fileTransport
  ],
  exitOnError: false
});

// If in development enable console log
if (process.env.NODE_ENV === 'development') {
  winstonLogger.add(new (winston.transports.Console)({
    level: 'info',
    format: combine(
      label({ label: 'mathms' }),
      timestamp(),
      json(),
      colorize(),
      print
    )
  }));
}

winstonLogger.stream = {
  write: function (message, encoding) {
    winstonLogger.info(message);
  }
};

module.exports = winstonLogger;