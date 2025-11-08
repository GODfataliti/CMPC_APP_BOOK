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

export interface QueryParams {
  page?: number;
  isAdvanceSearch?: boolean;
  general?: string;
  title?: string;
  category?: string;
  author?: string;
  publisher?: string;
  available?: boolean | null;
}
