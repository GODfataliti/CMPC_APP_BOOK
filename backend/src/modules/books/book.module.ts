import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogModule } from '../logs/log.module';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Book]), LogModule, JwtModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [SequelizeModule, BookService],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BookController);
  }
}
