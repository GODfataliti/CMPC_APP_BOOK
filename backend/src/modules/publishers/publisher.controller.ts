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
import type { Response } from 'express';
import { CreatePublisherDTO, UpdatePublisherDTO } from './DTOs';
import { PublisherService } from './publisher.service';
import { IsUUIDPipe } from '../../pipes';
import { Publisher } from './publisher.model';

@Controller('publishers')
export class PublisherController {
  constructor(private readonly service: PublisherService) {}

  // -- Endpoints.
  @Post('/create')
  async create(@Body() body: CreatePublisherDTO, @Res() res: Response) {
    const publisher: Publisher = await this.service.create(body);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'Publisher created successfully',
      publisher,
    });
    return;
  }

  @Get('/all')
  async getAll(@Res() res: Response) {
    const publishers: Publisher[] = await this.service.getAll();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Publishers fetched successfully',
      publishers,
    });
    return;
  }

  @Get('/:publisherID')
  async getByID(
    @Param('publisherID', new IsUUIDPipe()) publisherID: string,
    @Res() res: Response,
  ) {
    const publisher: Publisher | null = await this.service.getByID(publisherID);

    // 404 - Not Found.
    if (!publisher) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Publisher not found',
        publisher: null,
      });
      return;
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Publisher fetched successfully',
      publisher,
    });
    return;
  }

  @Put('/:publisherID')
  async update(
    @Param('publisherID', new IsUUIDPipe()) publisherID: string,
    @Body() body: UpdatePublisherDTO,
    @Res() res: Response,
  ) {
    const publisher = await this.service.getByID(publisherID);

    // 404 - Not Found.
    if (!publisher) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Publisher not found',
      });
      return;
    }

    await this.service.update(publisherID, body);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Publisher updated successfully',
    });
    return;
  }

  @Delete('/:publisherID')
  async delete(
    @Param('publisherID', new IsUUIDPipe()) publisherID: string,
    @Res() res: Response,
  ) {
    const publisher = await this.service.getByID(publisherID);

    // 404 - Not Found.
    if (!publisher) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Publisher not found',
      });
      return;
    }

    await this.service.delete(publisherID);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Publisher deleted successfully',
    });
    return;
  }

  @Post('/restore/:publisherID')
  async restore(
    @Param('publisherID', new IsUUIDPipe()) publisherID: string,
    @Res() res: Response,
  ) {
    const publisher = await this.service.getByID(publisherID);

    // 404 - Not Found.
    if (!publisher) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Publisher not found',
      });
      return;
    }

    await this.service.restore(publisherID);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Publisher restored successfully',
    });
    return;
  }
}
