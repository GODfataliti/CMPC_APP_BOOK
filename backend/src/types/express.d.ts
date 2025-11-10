import 'express';

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      email?: string;
    }

    export interface Request {
      user?: UserPayload;
      decoded?: any;
    }
  }
}
