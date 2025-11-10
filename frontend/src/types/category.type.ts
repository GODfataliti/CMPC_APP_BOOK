export interface Category {
  categoryID: string
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
