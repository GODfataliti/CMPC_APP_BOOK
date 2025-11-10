import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './DTOs';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO, @Res() res: Response) {
    try {
      const user = await this.service.register(body);

      res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
        user,
      });

      return;
    } catch (err: unknown) {
      this.logger.error(err);

      // TODO: Esto se puede mejorar.
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: (err as Error).message,
      });

      return;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDTO, @Res() res: Response) {
    try {
      const { token, safeUser } = await this.service.login(body);

      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Login successful',
        token,
        user: safeUser,
      });
      return;
    } catch (err: unknown) {
      this.logger.error(err);

      // TODO: Esto se puede mejorar.
      res.status(HttpStatus.UNAUTHORIZED).send({
        status: HttpStatus.UNAUTHORIZED,
        message: (err as Error).message,
      });

      return;
    }
  }

  @Post('logout')
  logout() {}

  @Put('verify-token')
  verifyToken() {}
}
