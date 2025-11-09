import { Controller, Post, Put } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  register() {}

  @Post('login')
  login() {}

  @Post('logout')
  logout() {}

  @Put('verify-token')
  verifyToken() {}
}
