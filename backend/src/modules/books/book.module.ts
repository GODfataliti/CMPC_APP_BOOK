import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
  exports: [SequelizeModule, BookService],
})
export class BookModule {}
