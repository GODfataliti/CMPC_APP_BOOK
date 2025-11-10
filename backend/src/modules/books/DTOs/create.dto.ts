import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookDTO {
  @ApiProperty()
  @IsUUID()
  authorID: string;

  @ApiProperty()
  @IsUUID()
  publisherID: string;

  @ApiProperty()
  @IsUUID()
  categoryID: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsBoolean()
  availability: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverImage?: string | null;
}
