export interface Session {
  ID: string;
  RUT: string;
  token?: string;
  createdAt?: string;
  expiredAt?: string;
}