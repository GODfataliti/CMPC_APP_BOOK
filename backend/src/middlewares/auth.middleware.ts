import {
  HttpException,
  Injectable,
  NestMiddleware,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { SafeUser } from 'src/modules/auth/types/safe-user';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // * -- Propiedades.
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwt: JwtService) {}

  use(request: Request, response: Response, next: NextFunction) {
    try {
      const auth = request.headers?.authorization as string;

      if (!auth) {
        throw new HttpException('Token missing', 401);
      }

      const [prefix, token] = auth.split(' ');

      if (prefix !== 'Bearer') {
        throw new HttpException('Invalid prefix', 401);
      }

      const decoded = this.jwt.verify<SafeUser>(token, {
        secret: env.JWT_SECRET,
      });
      request['decoded'] = decoded;

      request['user'] = {
        userId: decoded.userID ?? '',
      };

      next();
    } catch (err: unknown) {
      this.logger.error(err);

      // -- Expired token
      if (err instanceof TokenExpiredError) {
        return response.status(HttpStatus.UNAUTHORIZED).send({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Token expired',
        });
      }

      if (err instanceof HttpException) {
        return response.status(err.getStatus()).send({
          status: err.getStatus(),
          message: err.message,
        });
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problem with the token',
      });
    }
  }
}
