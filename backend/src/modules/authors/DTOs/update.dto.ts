import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString({ message: 'Author name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Author description must be a string' })
  @Length(10, 500, {
    message: 'Author description must be between 10 and 500 characters',
  })
  description?: string;
}
