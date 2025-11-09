import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAuthorDetails {
  authorID: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type AuthorInputData = Omit<IAuthorDetails, 'authorID'>;

@Table({
  tableName: 'authors',
  timestamps: true,
  paranoid: true,
})
export class Author extends Model<IAuthorDetails, AuthorInputData> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  authorID: string;

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

  /*
    @dev-note:
    Aquí podria agregar otros parametros como una foto de perfil, fecha de nacimiento, nacionalidad, etc.
  */
}
