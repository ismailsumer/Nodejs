// Bu dosya, Express'in global Request arayüzünü genişletmemizi sağlar.
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: string;
    }
  }
}