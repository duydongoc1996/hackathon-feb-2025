import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;
  private transports: winston.transport[] = [];

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    const lokiEnabled = this.configService.get('LOG_LOKI_ENABLED') === 'true';
    this.configure(lokiEnabled);
  }

  private configure(lokiEnabled: boolean) {
    if (!lokiEnabled) {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            // winston.format.align(),
            winston.format.printf(
              (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
            ),
          ),
        }),
      );
    } else {
      this.transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      );
    }

    this.logger = winston.createLogger({
      level: this.configService.get('LOG_LEVEL')!, // Adjust logging level as needed
      format: winston.format.json(),
      transports: this.transports,
    });
  }

  log(message: any, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: any, trace?: string) {
    this.logger.error(message, { trace });
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.verbose(message);
  }

  private parseObject(message: any) {
    return typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : message;
  }
}
