import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);

  private readonly uploadDir = join(process.cwd(), 'uploads');

  constructor() {
    // Crear carpeta si no existe
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir);
      this.logger.log(`📁 Carpeta creada: ${this.uploadDir}`);
    }
  }

  /**
   * Genera una ruta de archivo única y devuelve la URL pública
   */
  generateFilePath(originalName: string): {
    filePath: string;
    fileUrl: string;
  } {
    const ext = originalName.split('.').pop();
    const fileName = `${uuid()}image.${ext}`;
    const filePath = join(this.uploadDir, fileName);
    const fileUrl = `${process.env.API_URL}/uploads/${fileName}`;

    return { filePath, fileUrl };
  }
}
