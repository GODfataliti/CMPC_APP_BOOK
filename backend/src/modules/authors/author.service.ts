import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './author.model';
import { CreateAuthorDTO, UpdateAuthorDTO } from './DTOs/';

@Injectable()
export class AuthorService {
  private readonly logger: Logger = new Logger(AuthorService.name);

  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author,
  ) {}

  async create(payload: CreateAuthorDTO): Promise<Author> {
    const author: Author = await this.authorModel.create({
      name: payload.name,
      description: payload.description,
    });

    return author;
  }

  async getAll(): Promise<Author[]> {
    const authors: Author[] = await this.authorModel.findAll();
    return authors;
  }

  async getByID(authorID: string): Promise<Author | null> {
    const author: Author | null = await this.authorModel.findByPk(authorID, {
      paranoid: false,
    });
    return author;
  }

  async update(authorID: string, payload: UpdateAuthorDTO): Promise<void> {
    await this.authorModel.update(
      {
        name: payload.name,
        description: payload.description,
      },
      {
        where: {
          authorID,
        },
      },
    );

    return;
  }

  async delete(authorID: string): Promise<void> {
    await this.authorModel.destroy({
      where: {
        authorID,
      },
    });

    return;
  }

  async restore(authorID: string): Promise<void> {
    await this.authorModel.restore({
      where: {
        authorID,
      },
    });

    return;
  }
}
