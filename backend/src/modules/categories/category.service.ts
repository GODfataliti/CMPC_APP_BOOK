import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './DTOs';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);

  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  // -- Methods.
  async create(payload: CreateCategoryDTO): Promise<Category> {
    const category: Category = await this.categoryModel.create({
      name: payload.name,
      description: payload.description,
    });

    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories: Category[] = await this.categoryModel.findAll();

    return categories;
  }

  async getByID(categoryID: string): Promise<Category | null> {
    const category: Category | null = await this.categoryModel.findByPk(
      categoryID,
      {
        paranoid: false,
      },
    );

    return category;
  }

  async update(categoryID: string, payload: UpdateCategoryDTO): Promise<void> {
    await this.categoryModel.update(
      {
        name: payload.name,
        description: payload.description,
      },
      {
        where: {
          categoryID,
        },
      },
    );

    return;
  }

  async delete(categoryID: string) {
    await this.categoryModel.destroy({
      where: {
        categoryID,
      },
    });

    return;
  }

  async restore(categoryID: string): Promise<void> {
    await this.categoryModel.restore({
      where: {
        categoryID,
      },
    });

    return;
  }
}
