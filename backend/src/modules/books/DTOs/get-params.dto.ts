import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetBooksQueryDTO {
  @ApiPropertyOptional({
    description: 'Número de página para paginación',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Búsqueda global (por título, autor, ISBN, etc.)',
    example: 'Elantris',
  })
  @IsOptional()
  @IsString()
  general?: string;

  @ApiPropertyOptional({
    description: 'Título del libro (búsqueda avanzada)',
    example: 'El Imperio Final',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Categoría o género del libro',
    example: 'Fantasía',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Nombre del autor',
    example: 'Brandon Sanderson',
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    description: 'Nombre de la editorial',
    example: 'Nova',
  })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiPropertyOptional({
    description: 'Disponibilidad (true, false o null)',
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  available?: boolean | null;
}
