import { Injectable, Logger } from '@nestjs/common';
import { AuthorSeed } from './seeds/author.seed';
import { BookSeed } from './seeds/book.seed';
import { CategorySeed } from './seeds/category.seed';
import { PublisherSeed } from './seeds/publisher.seed';
import { UserSeed } from './seeds/user.seed';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly categorySeed: CategorySeed,
    private readonly publisherSeed: PublisherSeed,
    private readonly authorSeed: AuthorSeed,
    private readonly bookSeed: BookSeed,
    private readonly userSeed: UserSeed,
  ) {}

  async runAll() {
    this.logger.log('🌱 Ejecutando seeds...');

    await this.categorySeed.run();
    await this.publisherSeed.run();
    await this.authorSeed.run();
    await this.bookSeed.run();
    await this.userSeed.run();

    this.logger.log('✅ Seeds completados.');
  }
}
