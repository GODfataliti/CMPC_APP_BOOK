import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from '../../../modules/authors/author.model';
import { Book, BookInputData } from '../../../modules/books/book.model';
import { Category } from '../../../modules/categories/category.model';
import { Publisher } from '../../../modules/publishers/publisher.model';

@Injectable()
export class BookSeed {
  constructor(
    @InjectModel(Book) private readonly bookModel: typeof Book,
    @InjectModel(Author) private readonly authorModel: typeof Author,
    @InjectModel(Publisher) private readonly publisherModel: typeof Publisher,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async run() {
    const count = await this.bookModel.count();
    if (count > 0) return;

    const authors = await this.authorModel.findAll();
    const publishers = await this.publisherModel.findAll();
    const categories = await this.categoryModel.findAll();

    const find = (list: (Author | Publisher | Category)[], name: string) => {
      const item = list.find((i) => i.get('name') === name);
      return (
        item
          ? item.get('authorID') ||
            item.get('publisherID') ||
            item.get('categoryID')
          : ''
      ) as string;
    };

    const BrandonSanderson = find(authors, 'Brandon Sanderson');
    const Nova = find(publishers, 'Nova');
    const FantasyCategory = find(categories, 'Fantasía');
    // Brandon Sanderson
    const BrandonSandersonBooks: BookInputData[] = [
      {
        title: 'El Camino de los Reyes',
        authorID: BrandonSanderson,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/2666103485211.jpg',
        page: 1007,
        stock: 10,
        price: 25990,
        availability: true,
      },
      {
        title: 'Palabras Radiantes',
        authorID: BrandonSanderson,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/15095913485202.jpg',
        page: 1007,
        stock: 10,
        price: 27990,
        availability: true,
      },
      {
        title: 'Mistborn: El Imperio Final',
        authorID: BrandonSanderson,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/27537553485184.jpg',
        page: 1007,
        stock: 10,
        price: 19900,
        availability: true,
      },
      {
        title: 'El Héroe de las Eras',
        authorID: BrandonSanderson,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/25772943485210.jpg',
        page: 1007,
        stock: 10,
        price: 21990,
        availability: true,
      },
      {
        title: 'El Aliento de los Dioses',
        authorID: BrandonSanderson,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/7963443485184.jpg',
        page: 1007,
        stock: 10,
        price: 22900,
        availability: true,
      },
    ];

    const MarieLu = find(authors, 'Marie Lu');
    const MarieLuBooks: BookInputData[] = [
      {
        title: 'Warcross',
        authorID: MarieLu,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/6389103482330.jpg',
        page: 520,
        stock: 10,
        price: 20990,
        availability: true,
      },
      {
        title: 'Wildcar',
        authorID: MarieLu,
        publisherID: Nova,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/24203143485704.jpg',
        page: 488,
        stock: 10,
        price: 20990,
        availability: true,
      },
    ];

    const JRR_Tolkien = find(authors, 'J.R.R. Tolkien');
    const Minotauro = find(publishers, 'Minotauro');
    // Tolkien
    const TolkienBooks: BookInputData[] = [
      {
        title: 'El Hobbit',
        authorID: JRR_Tolkien,
        publisherID: Minotauro,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/23986223485194.jpg',
        page: 1007,
        stock: 10,
        price: 18500,
        availability: true,
      },
      {
        title: 'La Comunidad del Anillo',
        authorID: JRR_Tolkien,
        publisherID: Minotauro,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/23213373485194.jpg',
        page: 1007,
        stock: 10,
        price: 20990,
        availability: true,
      },
      {
        title: 'Las Dos Torres',
        authorID: JRR_Tolkien,
        publisherID: Minotauro,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/23985983485194.jpg',
        page: 1007,
        stock: 10,
        price: 20990,
        availability: true,
      },
      {
        title: 'El Retorno del Rey',
        authorID: JRR_Tolkien,
        publisherID: Minotauro,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/23986003485194.jpg',
        page: 1007,
        stock: 10,
        price: 20990,
        availability: true,
      },
      {
        title: 'El Silmarillion',
        authorID: JRR_Tolkien,
        publisherID: Minotauro,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/13613193484349.jpg',
        page: 1007,
        stock: 10,
        price: 22990,
        availability: true,
      },
    ];

    const Rowling = find(authors, 'J.K. Rowling');
    const Salamandra = find(publishers, 'Salamandra');
    // Rowling
    const RowlingBooks: BookInputData[] = [
      {
        title: 'Harry Potter y la piedra filosofal',
        authorID: Rowling,
        publisherID: Salamandra,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16225093482773.jpg',
        page: 1007,
        stock: 10,
        price: 17900,
        availability: true,
      },
      {
        title: 'Harry Potter y la cámara secreta',
        authorID: Rowling,
        publisherID: Salamandra,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16225163482773.jpg',
        page: 1007,
        stock: 10,
        price: 17900,
        availability: true,
      },
      {
        title: 'Harry Potter y el prisionero de Azkaban',
        authorID: Rowling,
        publisherID: Salamandra,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16225233482773.jpg',
        page: 1007,
        stock: 10,
        price: 17990,
        availability: true,
      },
      {
        title: 'Harry Potter y el cáliz de fuego',
        authorID: Rowling,
        publisherID: Salamandra,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16225393482773.jpg',
        page: 1007,
        stock: 10,
        price: 19900,
        availability: true,
      },
      {
        title: 'Harry Potter y la Orden del Fénix',
        authorID: Rowling,
        publisherID: Salamandra,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16225463482773.jpg',
        page: 1007,
        stock: 10,
        price: 19900,
        availability: true,
      },
    ];
    const Martin = find(authors, 'George R.R. Martin');
    const VintageEspanol = find(publishers, 'Vintage Espanol');
    // George R.R. Martin
    const MartinBooks: BookInputData[] = [
      {
        title: 'Juego de Tronos',
        authorID: Martin,
        publisherID: VintageEspanol,
        categoryID: FantasyCategory,
        coverImage:
          'https://images.cdn1.buscalibre.com/fit-in/360x360/5e/db/5edbc9fa0fdc1b73defbdbc84b331890.jpg',
        page: 1007,
        stock: 10,
        price: 21990,
        availability: true,
      },
      {
        title: 'Choque de reyes',
        authorID: Martin,
        publisherID: VintageEspanol,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16262503482773.jpg',
        page: 1007,
        stock: 10,
        price: 22990,
        availability: true,
      },
      {
        title: 'Tormenta de espadas',
        authorID: Martin,
        publisherID: VintageEspanol,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16262643482773.jpg',
        page: 1007,
        stock: 10,
        price: 23990,
        availability: true,
      },
      {
        title: 'Festín de Cuervos',
        authorID: Martin,
        publisherID: VintageEspanol,
        categoryID: FantasyCategory,
        coverImage:
          'https://images.cdn1.buscalibre.com/fit-in/360x360/8c/e1/8ce1b7252c79bdbea9abdccd32c46cc2.jpg',
        page: 1007,
        stock: 10,
        price: 24990,
        availability: true,
      },
      {
        title: 'Danza de Dragones',
        authorID: Martin,
        publisherID: VintageEspanol,
        categoryID: FantasyCategory,
        coverImage: 'https://images.isbndb.com/covers/16262803482773.jpg',
        page: 1007,
        stock: 10,
        price: 25990,
        availability: true,
      },
    ];

    await this.bookModel.bulkCreate([
      ...BrandonSandersonBooks,
      ...TolkienBooks,
      ...RowlingBooks,
      ...MartinBooks,
      ...MarieLuBooks,
    ]);
    console.log('✅ Books seeded.');
  }
}
