import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateBookDTO {
  @IsOptional()
  @IsUUID()
  authorID?: string;

  @IsOptional()
  @IsUUID()
  publisherID?: string;

  @IsOptional()
  @IsUUID()
  categoryID?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsBoolean()
  availability?: boolean;

  @IsOptional()
  @IsString()
  coverImage?: string | null;
}
