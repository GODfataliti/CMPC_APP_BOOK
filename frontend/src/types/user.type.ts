export interface User {
  userID: string
  username: string
  email: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
