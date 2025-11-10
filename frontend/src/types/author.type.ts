export interface Author {
  authorID: string
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
