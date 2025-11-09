import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorService } from './author.service';
import { Author } from './author.model';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [SequelizeModule, AuthorService],
})
export class AuthorModule {}
