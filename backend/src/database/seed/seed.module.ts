import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from '../../modules/authors/author.model';
import { Category } from '../../modules/categories/category.model';
import { Publisher } from '../../modules/publishers/publisher.model';
import { User } from '../../modules/users/user.model';
import { Book } from '../../modules/books/book.model';
import { SecureModule } from '../../modules/secure/secure.module';
import { SeedService } from './seed.service';
import { AuthorSeed } from './seeds/author.seed';
import { BookSeed } from './seeds/book.seed';
import { CategorySeed } from './seeds/category.seed';
import { PublisherSeed } from './seeds/publisher.seed';
import { UserSeed } from './seeds/user.seed';

@Module({
  imports: [
    SequelizeModule.forFeature([Author, Book, Publisher, Category, User]),
    SecureModule,
  ],
  providers: [
    SeedService,
    AuthorSeed,
    PublisherSeed,
    CategorySeed,
    BookSeed,
    UserSeed,
  ],
  exports: [SequelizeModule, SeedService],
})
export class SeedModule {}
