import type { Author } from './author.type'
import type { Category } from './category.type'
import type { Publisher } from './publisher.type'

export interface Book {
  bookID: string
  authorID: string
  publisherID: string
  categoryID: string
  title: string
  price: number
  page: number
  stock: number
  availability: boolean
  coverImage?: string | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  author?: Author
  publisher?: Publisher
  category?: Category
}

export interface SearchBook {
  title: string
  category: string
  author: string
  publisher: string
  available: boolean | null
}
