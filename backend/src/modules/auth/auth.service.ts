import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './DTOs';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { SecureService } from '../secure/secure.service';
import type { SafeUser } from './types/safe-user';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly user: UserService,
    private readonly secure: SecureService,
  ) {}

  async register(payload: RegisterDTO): Promise<User> {
    // 1. Verify prev.
    const prevUser = await this.user.getByEmail(payload.email);

    if (prevUser) {
      throw new Error('Email already in use');
    }

    // 2. Create user.
    const user: User = await this.user.create({
      username: payload.username,
      email: payload.email,
      password: payload.password,
    });

    return user;
  }

  async login(
    payload: LoginDTO,
  ): Promise<{ token: string; safeUser: SafeUser }> {
    const user: User | null = await this.user.getByEmail(payload.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: hashedPass } = user.dataValues;
    const isCorrect: boolean = await this.secure.compare(
      payload.password,
      hashedPass,
    );

    if (!isCorrect) {
      throw new Error('Invalid credentials');
    }

    // -- Generate TOKEN.
    const { userID, username, email } = user.dataValues;

    const safeUser: SafeUser = {
      userID,
      email,
      username,
    };
    const token: string = await this.secure.generateToken(safeUser);

    return { token, safeUser };
  }

  async verifyToken(token: string): Promise<SafeUser> {
    try {
      const decoded = await this.secure.verifyToken(token);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      return decoded as SafeUser;
    } catch (err: unknown) {
      this.logger.error(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
