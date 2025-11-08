import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { env } from './config/env';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupDoc } from './app.swagger';

async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');

  // -- Settings.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters();
  app.useGlobalInterceptors();
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'User-Agent',
      'x-api-key',
    ],
  });

  // -- Running.
  setupDoc(app);
  await app.listen(env.PORT);

  await app.getUrl().then((url: string) => {
    logger.log(`🚀 API Running on: ${url}/api`);
  });

  return;
}

void bootstrap();
