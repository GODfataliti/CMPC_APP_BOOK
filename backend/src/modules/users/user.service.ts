import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor() {}

  // createUser(payload: any) {}

  // getUserByID(userID: any) {}

  // getUSerByEmail(email: any) {}

  // updateUser(userID: any, payload: any) {}

  // deleteUser(userID: any) {}
}
