import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';

enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
  Silent = 'silent',
}

export const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty',
    options: {
      singleLine: true,
      colorize: true,
      translateTime: 'SYS:standard',
    },
  },
  redact: ['password', 'token', 'authorization'],
});

export const log = {
  error: (message: string, err: any) => {
    const tracking = uuidv4().replace(/-/g, '');
    logger[LogLevel.Error](`[${tracking}] err: ${err}`, err);
  },
  info: (message: string, data: any) => {
    const tracking = uuidv4().replace(/-/g, '');
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    logger[LogLevel.Info](`[${tracking}][message: ${message}] payload: ${payload}`);
  },
};
