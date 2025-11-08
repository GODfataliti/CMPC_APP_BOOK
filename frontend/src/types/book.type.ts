export interface Book {
  ID: string;
  ISBN: string;
  name: string;
  author: string;
  categories: Array<string>;
  publisher: string;
  release: string;
  pages?: number;
  image: string;
  availability: boolean;
}

export interface SearchBook {
  title: string;
  category: string;
  author: string;
  publisher: string;
  available: boolean | null;
}
