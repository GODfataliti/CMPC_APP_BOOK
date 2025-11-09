import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { env } from '../../config/env';
import bcrypt from 'bcrypt';

@Injectable()
export class SecureService {
  private readonly logger: Logger = new Logger(SecureService.name);

  constructor(private readonly jwt: JwtService) {}

  // -- Bcrypt Methods.
  async hashContent(content: string | Buffer): Promise<string> {
    const hashed: string = await bcrypt.hash(content, 10);
    return hashed;
  }

  async compare(content: string | Buffer, hash: string): Promise<boolean> {
    const isEqual: boolean = await bcrypt.compare(content, hash);
    return isEqual;
  }

  // -- JWT Methods.
  async generateToken(payload: object): Promise<string> {
    const options: JwtSignOptions = {
      algorithm: 'HS256',
      expiresIn: '1h',
      issuer: 'API books',
      audience: 'CMPC',
      subject: 'cmpc-books',
      secret: env.JWT_SECRET,
    };

    const token = await this.jwt.signAsync(payload, options);
    return token;
  }

  decodeToken(token: string): object {
    const decoded = this.jwt.decode<object>(token);
    this.logger.debug({ decoded });
    return decoded;
  }

  async verifyToken(token: string): Promise<object> {
    const options: JwtVerifyOptions = {
      algorithms: ['HS256'],
      issuer: 'API books',
      audience: 'CMPC',
      subject: 'cmpc-books',
      secret: env.JWT_SECRET,

      ignoreExpiration: false,
      ignoreNotBefore: false,
    };

    const result = await this.jwt.verifyAsync<object>(token, options);
    this.logger.debug({ result });

    return result;
  }
}
