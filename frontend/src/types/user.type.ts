
export interface User {
  ID: string;
  RUT: string;
  name: string;
  lastname?: string;
  token: string;
  imageURL?: string;
  createdAt?: string;
  updatedAt?: string;
}