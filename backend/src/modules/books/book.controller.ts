import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { IsUUIDPipe } from '../../pipes';
import type { Response } from 'express';
import { CreateBookDTO, GetBooksQueryDTO, UpdateBookDTO } from './DTOs';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private readonly service: BookService) {}

  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Get all books',
    description: 'Fetch all books with relations.',
  })
  @Get('/all')
  async getAll(@Res() res: Response): Promise<void> {
    const books = await this.service.getAllBooks();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Books fetched successfully',
      data: books,
    });
    return;
  }

  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Get book by ID',
    description: 'Fetch a single book by its unique ID.',
  })
  @Get('/find/:bookID')
  async getByID(
    @Param('bookID', new IsUUIDPipe()) bookID: string,
    @Res() res: Response,
  ): Promise<void> {
    const book = await this.service.getBookById(bookID);

    if (!book) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Book not found',
        data: null,
      });
      return;
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Book fetched successfully',
      data: book,
    });
    return;
  }

  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Search books by parameters',
    description:
      'Performs a flexible search based on dynamic query params. Empty strings are ignored.',
  })
  @Get('/search')
  async getByParams(
    @Query() query: GetBooksQueryDTO,
    @Res() res: Response,
  ): Promise<void> {
    const response = await this.service.getBooksByParams(query ?? {});

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Books fetched successfully',
      // filters: query,
      data: response,
    });
    return;
  }

  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Create a new book',
    description: 'Creates a new book with the provided data.',
  })
  @Post('/create')
  async create(
    @Body() body: CreateBookDTO,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user?.userID;
    const book = await this.service.createBook(body, userId);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'Book created successfully',
      data: book,
    });
    return;
  }

  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Update book by ID',
    description: 'Updates an existing book by its ID.',
  })
  @Put('update/:bookID')
  async update(
    @Param('bookID', new IsUUIDPipe()) bookID: string,
    @Body() body: UpdateBookDTO,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user?.userID;
    const book = await this.service.getBookById(bookID);

    if (!book) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Book not found',
      });
      return;
    }

    const updatedBook = await this.service.updateBook(bookID, body, userId);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Book updated successfully',
      data: updatedBook,
    });
    return;
  }

  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Delete book by ID',
    description: 'Deletes a book by its unique ID (soft delete).',
  })
  @Delete('delete/:bookID')
  async delete(
    @Param('bookID', new IsUUIDPipe()) bookID: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user?.userID;
    const book = await this.service.getBookById(bookID);

    if (!book) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Book not found',
      });
      return;
    }

    await this.service.deleteBook(bookID, userId);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Book deleted successfully',
    });
    return;
  }
}
