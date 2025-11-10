import type { Log } from '@/types'

export interface ResponseGetAll {
  status: number
  timestamp: string
  GLOSADESC: string
  ERRORCODE: number
  data: Array<Log>
}
