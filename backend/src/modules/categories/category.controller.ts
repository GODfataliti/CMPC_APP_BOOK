import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { IsUUIDPipe } from '../../pipes';
import { CreateCategoryDTO, UpdateCategoryDTO } from './DTOs';
import type { Response } from 'express';

@Controller('categories')
export class CategoryController {
  private readonly logger: Logger = new Logger(CategoryController.name);

  constructor(private readonly service: CategoryService) {}

  // -- Endpoints.
  @Post('/create')
  async create(@Body() body: CreateCategoryDTO, @Res() res: Response) {
    const category: Category = await this.service.create(body);

    res.status(HttpStatus.CREATED).send({
      status: HttpStatus.CREATED,
      message: 'Category created successfully',
      category,
    });
    return;
  }

  @Get('/all')
  async getAll(@Res() res: Response) {
    const categories: Category[] = await this.service.getAll();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Categories fetched successfully',
      categories,
    });
    return;
  }

  @Get('/:categoryID')
  async getByID(
    @Param('categoryID', new IsUUIDPipe()) categoryID: string,
    @Res() res: Response,
  ) {
    const category: Category | null = await this.service.getByID(categoryID);

    // 404 - Not Found.
    if (!category) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Category not found',
        category: null,
      });
      return;
    }

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Category fetched successfully',
      category,
    });
    return;
  }

  @Put('/:categoryID')
  async update(
    @Param('categoryID', new IsUUIDPipe()) categoryID: string,
    @Body() body: UpdateCategoryDTO,
    @Res() res: Response,
  ) {
    const category = await this.service.getByID(categoryID);

    // 404 - Not Found.
    if (!category) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Category not found',
      });
      return;
    }

    await this.service.update(categoryID, body);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Category updated successfully',
    });
    return;
  }

  @Delete('/:categoryID')
  async delete(
    @Param('categoryID', new IsUUIDPipe()) categoryID: string,
    @Res() res: Response,
  ) {
    const category = await this.service.getByID(categoryID);

    // 404 - Not Found.
    if (!category) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Category not found',
      });
      return;
    }

    await this.service.delete(categoryID);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Category deleted successfully',
    });
    return;
  }

  @Post('/restore/:categoryID')
  async restore(
    @Param('categoryID', new IsUUIDPipe()) categoryID: string,
    @Res() res: Response,
  ) {
    const category = await this.service.getByID(categoryID);

    // 404 - Not Found.
    if (!category) {
      res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: 'Category not found',
      });
      return;
    }

    await this.service.restore(categoryID);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Category restored successfully',
    });
    return;
  }
}
