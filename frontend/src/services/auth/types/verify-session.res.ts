import type { Session } from "@/types";

export interface VerifySessionResponse {
  data: Session;
  ERRORCODE: number;
  GLOSADESC: string;
  status: number;
  timestamp: string;
}
