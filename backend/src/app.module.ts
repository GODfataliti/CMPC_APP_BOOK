import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/books/book.module';
import { HealthModule } from './modules/health/health.module';
import { AuthorModule } from './modules/authors/author.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { env } from './config/env';

import { Author } from './modules/authors/author.model';

@Module({
  imports: [
    // -- Core.
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      models: [Author],
      autoLoadModels: true,
      synchronize: true,
      timezone: '-03:00', // Chile
    }),

    // -- Business.
    AuthModule,
    AuthorModule,
    BookModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
