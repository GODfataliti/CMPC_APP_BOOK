import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Publisher } from './publisher.model';
import { CreatePublisherDTO, UpdatePublisherDTO } from './DTOs';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher)
    private publisherModel: typeof Publisher,
  ) {}

  // -- Methods.
  async create(payload: CreatePublisherDTO): Promise<Publisher> {
    const publisher: Publisher = await this.publisherModel.create({
      name: payload.name,
    });

    return publisher;
  }

  async getAll(): Promise<Publisher[]> {
    const publishers: Publisher[] = await this.publisherModel.findAll();

    return publishers;
  }

  async getByID(publisherID: string): Promise<Publisher | null> {
    const publisher: Publisher | null = await this.publisherModel.findByPk(
      publisherID,
      {
        paranoid: false,
      },
    );

    return publisher;
  }

  async update(
    publisherID: string,
    payload: UpdatePublisherDTO,
  ): Promise<void> {
    await this.publisherModel.update(
      {
        name: payload.name,
      },
      {
        where: {
          publisherID,
        },
      },
    );

    return;
  }

  async delete(publisherID: string) {
    await this.publisherModel.destroy({
      where: {
        publisherID,
      },
    });

    return;
  }

  async restore(publisherID: string): Promise<void> {
    await this.publisherModel.restore({
      where: {
        publisherID,
      },
    });

    return;
  }
}
