import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonLoggerService } from './logger.service';

@Global()
@Module({
  imports: [],
  providers: [
    WinstonLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: WinstonLoggerService,
    },
  ],
  exports: [WinstonLoggerService],
})
export class LoggerModule {}
