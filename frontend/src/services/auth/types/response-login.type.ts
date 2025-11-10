import type { User } from '@/types'

export interface ResponseLogin {
  status: number
  timestamp: string
  GLOSADESC: string
  ERRORCODE: number
  user: User
  token: string
}
