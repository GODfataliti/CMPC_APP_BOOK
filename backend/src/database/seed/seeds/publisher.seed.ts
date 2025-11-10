import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Publisher } from '../../../modules/publishers/publisher.model';

@Injectable()
export class PublisherSeed {
  constructor(
    @InjectModel(Publisher) private readonly publisherModel: typeof Publisher,
  ) {}

  async run() {
    const count = await this.publisherModel.count();
    if (count > 0) return;

    await this.publisherModel.bulkCreate([
      { name: 'Nova' },
      { name: 'Minotauro' },
      { name: 'Salamandra' },
      { name: 'Vintage Espanol' },
      { name: 'Penguin Random House' },
      { name: 'Gollancz' },
    ]);

    console.log('✅ Publishers seeded.');
  }
}
