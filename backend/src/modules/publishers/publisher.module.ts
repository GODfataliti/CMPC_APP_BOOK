import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { Publisher } from './publisher.model';
import { AuthMiddleware } from 'src/middlewares';

@Module({
  imports: [SequelizeModule.forFeature([Publisher])],
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [SequelizeModule, PublisherService],
})
export class PublisherModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PublisherController);
  }
}
