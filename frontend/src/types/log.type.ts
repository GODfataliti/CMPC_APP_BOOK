export type LogAction = 'CREATE' | 'UPDATE' | 'DELETE'
export type LogEntity = 'book' | 'author' | 'publisher' | 'category'

export interface Log {
  logId: string
  userId: string
  action: LogAction
  entity: LogEntity
  entityId: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}
