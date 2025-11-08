import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [LoggingService],
})
export class LoggingModule {}
