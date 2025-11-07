import type { Book } from '@/types'

export interface GetBooksRES {
  data: BookResultsData;
  ERRORCODE: number;
  GLOSADESC: string;
  status: number;
  timestamp: string;
}

export interface BookResultsData {
  books: Array<Book>;
  page: number;
  pages: number;
}
