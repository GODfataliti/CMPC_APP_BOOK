import { Controller, Logger } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor() {}
}
