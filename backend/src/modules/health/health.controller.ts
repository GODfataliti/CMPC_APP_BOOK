import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor() {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Service is healthy' })
  @Get('/')
  checkHealth(@Res() res: Response): void {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: 'Service is healthy',
      timestamp: new Date().toISOString(),
    });
    return;
  }
}
