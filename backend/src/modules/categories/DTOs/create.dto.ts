import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Category description is required' })
  @IsString({ message: 'Category description must be a string' })
  @Length(10, 500, {
    message: 'Category description must be between 10 and 500 characters',
  })
  description: string;
}
