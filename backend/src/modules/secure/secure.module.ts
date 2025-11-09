import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SecureService } from './secure.service';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [SecureService],
  exports: [SecureService],
})
export class SecureModule {}
