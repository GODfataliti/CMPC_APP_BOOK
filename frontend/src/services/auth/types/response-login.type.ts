export interface Usuario {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface ResponseLogin {
  status: number;
  timestamp: string;
  GLOSADESC: string;
  ERRORCODE: number;
  data: Usuario
}