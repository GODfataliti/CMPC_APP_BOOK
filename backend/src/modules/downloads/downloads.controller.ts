import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DownloadsService } from './downloads.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Downloads')
@ApiBearerAuth('jwt-auth')
@Controller('download')
export class DownloadsController {
  private readonly logger = new Logger(DownloadsController.name);

  constructor(private readonly service: DownloadsService) {}

  @ApiOperation({
    summary: 'Export Csv',
    description: 'Fetch all books with relations into a csv',
  })
  @Get('export-csv')
  async exportBooksToCSV(@Res() res: Response) {
    try {
      const csvBuffer = await this.service.exportBooksToCSV();

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="books_export.csv"',
      );
      res.status(HttpStatus.OK).send(csvBuffer);
    } catch (err: unknown) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error generating CSV export',
      });
    }
  }
}
