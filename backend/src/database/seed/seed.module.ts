import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/modules/authors/author.model';
import { Category } from 'src/modules/categories/category.model';
import { Publisher } from 'src/modules/publishers/publisher.model';
import { SeedService } from './seed.service';
import { AuthorSeed } from './seeds/author.seed';
import { BookSeed } from './seeds/book.seed';
import { CategorySeed } from './seeds/category.seed';
import { PublisherSeed } from './seeds/publisher.seed';
import { Book } from 'src/modules/books/book.model';

@Module({
  imports: [SequelizeModule.forFeature([Author, Book, Publisher, Category])],
  providers: [SeedService, AuthorSeed, PublisherSeed, CategorySeed, BookSeed],
  exports: [SequelizeModule, SeedService],
})
export class SeedModule {}
