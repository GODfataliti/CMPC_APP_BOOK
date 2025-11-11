import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const builder = new DocumentBuilder()
  .setTitle('CMPC Books')
  .setDescription('API Documentation for CMPC Books')
  .setVersion('1.0')
  .setContact(
    'José González',
    'https://www.linkedin.com/in/fatalitigonzalezjose/',
    'gonzalez.gi.jose@gmail.com',
  )
  .addBearerAuth(
    {
      type: 'http',
      in: 'header',
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT Bearer token needed to access the endpoints',
    },
    'jwt-auth',
  )
  .build();

const document = (app: INestApplication) =>
  SwaggerModule.createDocument(app, builder);

export const setupDoc = (app: INestApplication) => {
  SwaggerModule.setup('docs', app, document(app));
};
