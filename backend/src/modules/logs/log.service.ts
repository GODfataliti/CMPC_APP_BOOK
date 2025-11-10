// src/modules/logs/log.service.ts (ejemplo simplificado)
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log, LogAction, LogEntity } from './log.model';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(
    @InjectModel(Log)
    private readonly logModel: typeof Log,
  ) {}

  async createLog(
    userId: string,
    action: LogAction,
    entity: LogEntity,
    entityId: string,
  ): Promise<Log> {
    const created = await this.logModel.create({
      userId: userId,
      action: action,
      entity: entity,
      entityId: entityId,
    });

    this.logger.log(`[LOG] ${action} ${entity} ${entityId} by ${userId}`);
    return created;
  }

  async findAll(): Promise<Log[]> {
    const logs: Log[] = await this.logModel.findAll({
      include: ['user'],
    });
    return logs;
  }
}
