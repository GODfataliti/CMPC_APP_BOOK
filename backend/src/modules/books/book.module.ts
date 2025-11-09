import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule {}
