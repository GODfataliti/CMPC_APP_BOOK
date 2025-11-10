import {
  Column,
  DataType,
  Model,
  Table,
  Index,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

export type LogAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type LogEntity = 'book' | 'author' | 'publisher' | 'category';

interface ILogDetails {
  logId: string;
  userId: string;
  action: LogAction;
  entity: LogEntity;
  entityId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type LogInputData = Omit<
  ILogDetails,
  'logId' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

@Table({
  tableName: 'logs',
  timestamps: true, // createdAt, updatedAt automáticos
  paranoid: false, // no soft-delete por defecto (ajusta si quieres)
})
export class Log extends Model<ILogDetails, LogInputData> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  logId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.ENUM('CREATE', 'UPDATE', 'DELETE'),
    allowNull: false,
  })
  action!: LogAction;

  @Column({
    type: DataType.ENUM('book', 'author', 'publisher', 'category'),
    allowNull: false,
  })
  entity!: LogEntity;

  @Index
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  entityId!: string;

  @BelongsTo(() => User)
  user: User;
}
