import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IPublisherDetails {
  publisherID: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type PublisherInputData = Omit<IPublisherDetails, 'publisherID'>;

@Table({
  tableName: 'publishers',
  timestamps: true,
  paranoid: true, // 🔊 Radiohead - Paranoid android.
})
export class Publisher extends Model<Publisher, PublisherInputData> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  publisherID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
