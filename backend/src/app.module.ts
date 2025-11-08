import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [AuthModule, BookModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
