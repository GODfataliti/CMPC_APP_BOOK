import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/books/book.module';
import { HealthModule } from './modules/health/health.module';
import { AuthorModule } from './modules/authors/author.module';
import { PublisherModule } from './modules/publishers/publisher.module';
import { CategoryModule } from './modules/categories/category.module';
import { LogModule } from './modules/logs/log.module';
import { SeedModule } from './database/seed/seed.module';
import { env } from './config/env';
import { SeedService } from './database/seed/seed.service';
import { UploadsModule } from './modules/uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // -- Core.
    JwtModule.register({
      global: true,
    }),
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
      logging: false,
    }),

    // -- Seed.
    SeedModule,

    // -- Business.
    AuthModule,
    AuthorModule,
    CategoryModule,
    PublisherModule,
    BookModule,
    HealthModule,
    UploadsModule,
    LogModule,
    // Exponer carpeta uploads como pública
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.runAll();
  }
}
