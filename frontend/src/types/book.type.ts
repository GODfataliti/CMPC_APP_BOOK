export interface Book {
  bookID: string;
  authorID: string;
  publisherID: string;
  categoryID: string;
  title: string;
  price: number;
  page: number;
  stock: number;
  availability: boolean;
  coverImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface SearchBook {
  title: string;
  category: string;
  author: string;
  publisher: string;
  available: boolean | null;
}
