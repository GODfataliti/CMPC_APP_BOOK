import type { Book } from '@/types'

export interface CreateBooksRES {
  data: Book
  ERRORCODE: number
  GLOSADESC: string
  status: number
  timestamp: string
}

export interface CreateBookPayload {
  authorID: string
  publisherID: string
  categoryID: string
  title: string
  price: number
  page: number
  stock: number
  availability: boolean
  coverImage?: string | null
}
