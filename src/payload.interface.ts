import { Role } from './role.enum';
export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  password: string;
  dob: Date;
  role: Role;
}
