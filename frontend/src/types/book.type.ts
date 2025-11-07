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
