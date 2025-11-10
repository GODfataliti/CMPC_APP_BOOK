import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserDetails {
  userID: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UserInputData = Omit<IUserDetails, 'userID'>;

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true, // 🔊 Radiohead - Paranoid android.
})
export class User extends Model<IUserDetails, UserInputData> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  userID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
