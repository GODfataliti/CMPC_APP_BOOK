import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from './config/env';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupDoc } from './app.swagger';
import { join } from 'path';

async function bootstrap(): Promise<void> {
  const logger = new Logger('main');

  // -- Settings.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters();
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

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
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
