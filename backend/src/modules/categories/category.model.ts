import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICategoryDetails {
  categoryID: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type CategoryInputData = Omit<ICategoryDetails, 'categoryID'>;

@Table({
  tableName: 'categories',
  timestamps: true,
  paranoid: true,
})
export class Category extends Model<ICategoryDetails, CategoryInputData> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  categoryID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
