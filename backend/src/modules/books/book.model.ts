import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Author } from '../authors/author.model';
import { Publisher } from '../publishers/publisher.model';
import { Category } from '../categories/category.model';

export interface IBookDetails {
  bookID: string;
  authorID: string;
  publisherID: string;
  categoryID: string;
  title: string;
  price: number;
  page: number;
  stock: number;
  availability: boolean;
  coverImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type BookInputData = Omit<IBookDetails, 'bookID'>;

@Table({
  tableName: 'books',
  timestamps: true,
  paranoid: true, // 🔊 Radiohead - Paranoid android.
})
export class Book extends Model<IBookDetails, BookInputData> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  bookID: string;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  authorID: string;

  @ForeignKey(() => Publisher)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  publisherID: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  page: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  availability: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  coverImage: string | null;

  @BelongsTo(() => Author)
  author: Author;

  @BelongsTo(() => Publisher)
  publisher: Publisher;

  @BelongsTo(() => Category)
  category: Category;
}
