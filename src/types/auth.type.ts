// src/types/login.ts

import type { TRole } from ".";


export interface ILogin {
  email: string;
  password: string;
  role: TRole; 
}
