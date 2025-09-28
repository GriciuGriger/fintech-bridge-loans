import winston from 'winston';
import path from 'path';

const logLevel = process.env['LOG_LEVEL'] || 'info';
const logFile = process.env['LOG_FILE'] || 'logs/app.log';

// Create logs directory if it doesn't exist
import fs from 'fs';
const logsDir = path.dirname(logFile);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Create logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: { service: 'fintech-backend' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      )
    }),
    
    // File transport for errors
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // File transport for all logs
    new winston.transports.File({
      filename: logFile,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
});

// Handle uncaught exceptions and unhandled rejections
if (process.env['NODE_ENV'] === 'production') {
  logger.exceptions.handle(
    new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') })
  );
  
  logger.rejections.handle(
    new winston.transports.File({ filename: path.join(logsDir, 'rejections.log') })
  );
}
