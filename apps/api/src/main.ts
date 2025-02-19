import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Config
  const configService = app.get(ConfigService);

  // Logger
  const logger = app.get(WinstonLoggerService);
  app.useLogger(logger); // Use custom logger

  // Listen
  const port = configService.get('PORT');
  await app.listen(port ?? 4000);
}
bootstrap();
