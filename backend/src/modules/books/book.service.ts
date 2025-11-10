import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book, IBookDetails } from './book.model';
import { FindOptions, Op } from 'sequelize';
import { CreateBookDTO, GetBooksQueryDTO, UpdateBookDTO } from './DTOs';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  // --------------------------------------------------------
  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel.findAll({
      include: ['author', 'publisher', 'category'],
    });
  }

  // --------------------------------------------------------
  async getBookById(bookID: string): Promise<Book | null> {
    return await this.bookModel.findByPk(bookID, {
      include: ['author', 'publisher', 'category'],
    });
  }

  // --------------------------------------------------------
  async getBooksByParams(query: Partial<GetBooksQueryDTO>): Promise<Book[]> {
    const {
      page = 1,
      general = '',
      title = '',
      category = '',
      author = '',
      publisher = '',
      available = null,
    } = query;
    const where: FindOptions<IBookDetails>['where'] = {};

    // 🔍 Modo global
    if (general && general.trim() !== '') {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${general}%` } },
        { '$author.name$': { [Op.iLike]: `%${general}%` } },
        { '$publisher.name$': { [Op.iLike]: `%${general}%` } },
        { '$category.name$': { [Op.iLike]: `%${general}%` } },
      ];
    }

    // 🔍 Modo avanzado
    if (title && title.trim() !== '')
      where.title = { [Op.iLike]: `%${title}%` };
    if (category && category.trim() !== '')
      where['$category.name$'] = { [Op.iLike]: `%${category}%` };
    if (author && author.trim() !== '')
      where['$author.name$'] = { [Op.iLike]: `%${author}%` };
    if (publisher && publisher.trim() !== '')
      where['$publisher.name$'] = { [Op.iLike]: `%${publisher}%` };

    if (available !== undefined && available !== null)
      where.availability = available === true;

    const books = await this.bookModel.findAll({
      where,
      include: ['author', 'publisher', 'category'],
      limit: 20,
      offset: (page - 1) * 20,
      order: [['createdAt', 'DESC']],
    });

    return books;
  }

  // --------------------------------------------------------
  async createBook(data: CreateBookDTO): Promise<Book> {
    return await this.bookModel.create(data);
  }

  // --------------------------------------------------------
  async updateBook(bookID: string, data: UpdateBookDTO): Promise<Book> {
    const [_, [updatedBook]] = await this.bookModel.update(data, {
      where: { bookID },
      returning: true,
    });
    return updatedBook;
  }

  // --------------------------------------------------------
  async deleteBook(bookID: string): Promise<void> {
    await this.bookModel.destroy({ where: { bookID } });
  }
}
