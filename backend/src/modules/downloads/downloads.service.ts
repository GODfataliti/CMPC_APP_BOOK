import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../books/book.model';
import { parse } from 'json2csv';

@Injectable()
export class DownloadsService {
  private readonly logger = new Logger(DownloadsService.name);

  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  async exportBooksToCSV(): Promise<string> {
    try {
      const books = await this.bookModel.findAll({
        include: ['author', 'publisher', 'category'],
      });

      const plainBooks = books.map((book) => ({
        ID: book.bookID,
        Título: book.title,
        Autor: book.author?.name ?? '',
        Editorial: book.publisher?.name ?? '',
        Categoría: book.category?.name ?? '',
        Precio: book.price ?? 0,
        Páginas: book.page ?? 0,
        Stock: book.stock ?? 0,
        Disponible: book.availability ? 'Sí' : 'No',
      }));

      const csv: string = parse(plainBooks, {
        delimiter: ';',
      });

      return csv;
    } catch (error: unknown) {
      // ✅ Tipar y loguear correctamente
      const errMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error generating CSV: ${errMsg}`);

      throw new Error('Error generating CSV export');
    }
  }
}
