import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SecureModule } from '../secure/secure.module';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from 'src/middlewares';

@Module({
  imports: [SequelizeModule.forFeature([User]), SecureModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
