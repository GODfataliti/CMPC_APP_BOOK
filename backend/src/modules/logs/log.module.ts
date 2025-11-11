import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from './log.model';
import { AuthMiddleware } from 'src/middlewares';

@Module({
  imports: [SequelizeModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService],
  exports: [SequelizeModule, LogService],
})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LogController);
  }
}
