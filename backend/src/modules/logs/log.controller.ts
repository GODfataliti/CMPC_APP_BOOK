import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { LogService } from './log.service';
import type { Response } from 'express';

@Controller('logs')
export class LogController {
  constructor(private readonly service: LogService) {}

  @Get('/all')
  async getAll(@Res() res: Response): Promise<void> {
    const logs = await this.service.findAll();

    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Logs fetched successfully',
      data: logs,
    });
    return;
  }
}
