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
import { Author } from '../authors/author.model';
import { Publisher } from '../publishers/publisher.model';
import { Book } from '../books/book.model';
import { Category } from '../categories/category.model';

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

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  entityId!: string;

  @BelongsTo(() => User)
  user: User;
}
