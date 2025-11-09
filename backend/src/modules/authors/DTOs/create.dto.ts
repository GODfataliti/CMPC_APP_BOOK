import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty({ message: 'Author name is required' })
  @IsString({ message: 'Author name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Author description is required' })
  @IsString({ message: 'Author description must be a string' })
  @Length(10, 500, {
    message: 'Author description must be between 10 and 500 characters',
  })
  description: string;
}
