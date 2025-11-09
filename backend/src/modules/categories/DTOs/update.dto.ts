import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString({ message: 'Category name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Category description must be a string' })
  @Length(10, 500, {
    message: 'Category description must be between 10 and 500 characters',
  })
  description?: string;
}
