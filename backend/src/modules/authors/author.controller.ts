import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { IsUUIDPipe } from '../../pipes';
import { CreateAuthorDTO, UpdateAuthorDTO } from './DTOs/';
import { Author } from './author.model';
import type { Response } from 'express';

@ApiTags('Authors')
@ApiBearerAuth('jwt-auth')
@Controller('authors')
export class AuthorController {
  constructor(private readonly service: AuthorService) {}

  // -- Endpoints.
  @ApiOperation({
    summary: 'Create a new author',
    description: 'Creates a new author with the provided name and description.',
  })
  @Post('create')
  async create(
    @Body() body: CreateAuthorDTO,
    @Res() res: Response,
  ): Promise<void> {
    const author: Author = await this.service.create(body);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'Author created successfully',
      author,
    });
    return;
  }

  @ApiOperation({
    summary: 'Get all authors',
    description: 'Fetches all authors from the database.',
  })
  @Get('/all')
  async getAll(@Res() res: Response): Promise<void> {
    const authors: Author[] = await this.service.getAll();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Authors fetched successfully',
      authors,
    });
    return;
  }

  @ApiOperation({
    summary: 'Get author by ID',
    description: 'Fetches an author by their unique ID.',
  })
  @Get(':authorID')
  async getByID(
    @Param('authorID', new IsUUIDPipe()) authorID: string,
    @Res() res: Response,
  ): Promise<void> {
    const author: Author | null = await this.service.getByID(authorID);

    // 404 - Not Found.
    if (!author) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Author not found',
        author: null,
      });
      return;
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Author fetched successfully',
      author,
    });
    return;
  }

  @ApiOperation({
    summary: 'Update author by ID',
    description: 'Updates an author by their unique ID.',
  })
  @Put(':authorID')
  async update(
    @Param('authorID', new IsUUIDPipe()) authorID: string,
    @Body() body: UpdateAuthorDTO,
    @Res() res: Response,
  ): Promise<void> {
    const author = await this.service.getByID(authorID);

    // 404 - Not Found.
    if (!author) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Author not found',
      });
      return;
    }

    await this.service.update(authorID, body);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Author updated successfully',
    });
    return;
  }

  @ApiOperation({
    summary: 'Delete author by ID',
    description: 'Deletes an author by their unique ID.',
  })
  @Delete(':authorID')
  async delete(
    @Param('authorID', new IsUUIDPipe()) authorID: string,
    @Res() res: Response,
  ): Promise<void> {
    const author = await this.service.getByID(authorID);

    // 404 - Not Found.
    if (!author) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Author not found',
      });
      return;
    }

    await this.service.delete(authorID);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Author deleted successfully',
    });
    return;
  }

  @Post('/restore/:authorID')
  async restore(
    @Param('authorID', new IsUUIDPipe()) authorID: string,
    @Res() res: Response,
  ): Promise<void> {
    const author = await this.service.getByID(authorID);

    // 404 - Not Found.
    if (!author) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Author not found',
      });
      return;
    }

    await this.service.restore(authorID);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Author restored successfully',
    });
    return;
  }
}
