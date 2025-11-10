import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SecureService } from 'src/modules/secure/secure.service';
import { User } from 'src/modules/users/user.model';

@Injectable()
export class UserSeed {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly secure: SecureService,
  ) {}

  async run() {
    const count = await this.userModel.count();
    if (count > 0) return;

    const hashed: string = await this.secure.hashContent('asd123');

    await this.userModel.create({
      username: 'Admin prueba',
      email: 'admin@cmpc.com',
      password: hashed,
      createdAt: new Date(),
    });

    console.log('✅ User seeded.');
  }
}
