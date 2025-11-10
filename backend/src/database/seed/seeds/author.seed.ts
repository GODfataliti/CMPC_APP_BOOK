import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from '../../../modules/authors/author.model';

@Injectable()
export class AuthorSeed {
  constructor(
    @InjectModel(Author) private readonly authorModel: typeof Author,
  ) {}

  async run() {
    const count = await this.authorModel.count();
    if (count > 0) return;

    await this.authorModel.bulkCreate([
      {
        name: 'Brandon Sanderson',
        description: 'Escritor estadounidense de fantasía.',
      },
      {
        name: 'J.R.R. Tolkien',
        description: 'Escritor inglés, autor de El Señor de los Anillos.',
      },
      {
        name: 'J.K. Rowling',
        description:
          'Escritora británica, conocida por la serie de Harry Potter.',
      },
      {
        name: 'George R.R. Martin',
        description:
          'Escritor estadounidense de novelas y cuentos, autor de Canción de hielo y fuego.',
      },
      {
        name: 'Isaac Asimov',
        description:
          'Escritor y profesor de bioquímica estadounidense de origen ruso.',
      },
      {
        name: 'Patrick Rothfuss',
        description:
          'Escritor estadounidense de fantasía, autor de La Crónica del Asesino de Reyes.',
      },
      {
        name: 'Stephen King',
        description:
          'Escritor estadounidense de terror, ficción sobrenatural y novelas de fantasía.',
      },
      {
        name: 'Neil Gaiman',
        description:
          'Escritor inglés de ficción corta, novelas, cómics y películas.',
      },
      {
        name: 'Frank Herbert',
        description: 'Escritor estadounidense, conocido por la serie Dune.',
      },
      {
        name: 'Suzanne Collins',
        description:
          'Escritora estadounidense, conocida por la trilogía de Los Juegos del Hambre.',
      },
    ]);

    console.log('✅ Authors seeded.');
  }
}
