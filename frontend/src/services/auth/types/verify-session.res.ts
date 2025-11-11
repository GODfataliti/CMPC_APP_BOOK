import type { SafeUser } from '@/types'

export interface VerifySessionResponse {
  data: SafeUser
  ERRORCODE: number
  GLOSADESC: string
  status: number
  timestamp: string
}
