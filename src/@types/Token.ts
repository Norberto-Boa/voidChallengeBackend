import { JwtPayload } from "jsonwebtoken";

export interface decryptedToken extends JwtPayload {
  email: string;
  name: string;
}