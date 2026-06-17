import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const loggerType = process.env.LOGGER_TYPE || 'dev';

  switch (loggerType) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
      app.useLogger(new DevLogger());
      break;
  }

  await app.listen(3000);
  console.log(`✅ Server running with ${loggerType} logger`);
}
bootstrap();