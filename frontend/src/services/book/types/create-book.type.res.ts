import type { Book } from '@/types'

export interface CreateBooksRES {
  data: Book;
  ERRORCODE: number;
  GLOSADESC: string;
  status: number;
  timestamp: string;
}

export interface CreateBookPayload {
  ISBN: string;
  name: string;
  author: string;
  categories: Array<string>;
  publisher: string;
  release: string;
  pages: number;
  image?: string;
  availability: boolean;
};