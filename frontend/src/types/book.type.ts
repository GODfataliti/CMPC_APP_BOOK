export interface Book {
  book_id: string;
  author_id: string;
  publisher_id: string;
  category_id: string;
  title: string;
  price: number;
  availability: boolean;
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SearchBook {
  title: string;
  category: string;
  author: string;
  publisher: string;
  available: boolean | null;
}
