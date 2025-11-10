import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../../modules/categories/category.model';

@Injectable()
export class CategorySeed {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async run() {
    const count = await this.categoryModel.count();
    if (count > 0) return;

    await this.categoryModel.bulkCreate([
      {
        name: 'Fantasía',
        description: 'Books set in fictional worlds with magic.',
      },
      {
        name: 'Ciencia Ficción',
        description: 'Ficción que explora avances científicos y tecnológicos.',
      },
      {
        name: 'Misterio',
        description:
          'Historias de suspense que involucran la resolución de crímenes o secretos.',
      },
      {
        name: 'Romance',
        description: 'Historias centradas en el amor y las relaciones.',
      },
      {
        name: 'Ficción Histórica',
        description: 'Ficción ambientada en un período histórico.',
      },
      {
        name: 'Aventura',
        description: 'Relatos emocionantes de exploración o peligro.',
      },
      {
        name: 'Horror',
        description:
          'Historias diseñadas para asustar o inquietar a los lectores.',
      },
      {
        name: 'No Ficción',
        description: 'Libros basados en eventos e información fáctica.',
      },
    ]);

    console.log('✅ Categories seeded.');
  }
}
