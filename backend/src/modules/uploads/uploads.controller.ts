import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { UploadsService } from './uploads.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const { filePath } = new UploadsService().generateFilePath(
            file.originalname,
          );
          const fileName =
            filePath?.split('\\').pop() ||
            filePath?.split('/').pop() ||
            `upload-${Date.now()}.jpg`;
          cb(null, fileName);
        },
      }),
      limits: { fileSize: 3 * 1024 * 1024 }, // máximo 3MB
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: 'No se subió ningún archivo.',
      });
      return;
    }

    const { fileUrl } = this.uploadsService.generateFilePath(file.originalname);

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Imagen subida correctamente.',
      data: { url: fileUrl },
    });
  }
}
