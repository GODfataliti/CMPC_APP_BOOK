import type { Book } from '@/types'

export interface UpdateBooksRES {
  data: Book;
  ERRORCODE: number;
  GLOSADESC: string;
  status: number;
  timestamp: string;
}

export interface UpdateBookDTO {
  update: {
    ISBN?: string;
    name?: string;
    author?: string;
    categories?: Array<string>;
    publisher?: string;
    release?: string;
    pages?: number;
    image?: string;
    availability?: boolean;
    updatedAt?: string;
  };
  bookID: string;
}