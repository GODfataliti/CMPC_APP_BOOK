export interface Session {
  ID: string;
  token: string;
  rut: string;
  createdAt: string;
  expiredAt: string;
}

export interface VerifySessionRES {
  session: Session;
}

export interface VerifySessionResponse {
  data: VerifySessionRES;
  ERRORCODE: number;
  GLOSADESC: string;
  status: number;
  timestamp: string;
}
