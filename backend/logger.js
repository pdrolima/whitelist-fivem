const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format;

const formatter = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  });

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        formatter
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'whitelist.log' })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: combine(
            timestamp(),
            formatter
        ),
    }));
  }

module.exports = logger;