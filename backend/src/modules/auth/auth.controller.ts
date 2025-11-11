import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './DTOs';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly service: AuthService) {}
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user with the provided email and username.',
  })
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

  @ApiOperation({
    summary: 'Login',
    description: '',
  })
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

  @Post('verify-token')
  async verifyToken(@Body() body: { token?: string }, @Res() res: Response) {
    try {
      if (!body?.token) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status: HttpStatus.BAD_REQUEST,
          GLOSADESC: 'Token missing',
        });
      }

      const decodedUser = await this.service.verifyToken(body.token);

      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Token is valid',
        data: decodedUser,
      });
    } catch (err: unknown) {
      this.logger.error(err);
      res.status(HttpStatus.UNAUTHORIZED).send({
        status: HttpStatus.UNAUTHORIZED,
        GLOSADESC: 'Invalid or expired token',
      });
    }
  }
}
