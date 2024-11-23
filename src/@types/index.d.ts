declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      name: string;
      perfil?: string;
      recidente?: string;
      token: string;
      roles: string[]; 
      idRol: string;  
    };
  }
}
