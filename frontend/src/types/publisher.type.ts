export interface Publisher {
  publisherID: string
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
