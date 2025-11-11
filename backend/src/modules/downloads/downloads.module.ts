import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DownloadsController } from './downloads.controller';
import { DownloadsService } from './downloads.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from '../books/book.model';
import { AuthMiddleware } from 'src/middlewares';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [DownloadsController],
  providers: [SequelizeModule, DownloadsService],
})
export class DownloadsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DownloadsController);
  }
}
