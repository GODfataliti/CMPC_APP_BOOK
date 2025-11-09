import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/books/book.module';
import { HealthModule } from './modules/health/health.module';
import { AuthorModule } from './modules/authors/author.module';
import { PublisherModule } from './modules/publishers/publisher.module';
import { CategoryModule } from './modules/categories/category.module';
import { env } from './config/env';

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
      autoLoadModels: true,
      synchronize: true,
      timezone: '-03:00', // Chile
    }),

    // -- Business.
    AuthModule,
    AuthorModule,
    CategoryModule,
    PublisherModule,
    BookModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
