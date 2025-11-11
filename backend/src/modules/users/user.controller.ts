import { Controller, Logger } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('jwt-auth')
@Controller('users')
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor() {}
}
