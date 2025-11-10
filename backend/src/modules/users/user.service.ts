import { Injectable, Logger } from '@nestjs/common';
import { User, UserInputData } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { SecureService } from '../secure/secure.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly secure: SecureService,
  ) {}

  async create(payload: UserInputData) {
    const hashed: string = await this.secure.hashContent(payload.password);

    const user: User = await this.userModel.create({
      username: payload.username,
      email: payload.email,
      password: hashed,
    });

    return user;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this.userModel.findAll();

    return users;
  }

  async getByID(userID: string): Promise<User | null> {
    const user: User | null = await this.userModel.findByPk(userID);

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.userModel.findOne({
      where: { email },
    });

    return user;
  }

  // updateUser(userID: any, payload: any) {}

  // deleteUser(userID: any) {}
}
