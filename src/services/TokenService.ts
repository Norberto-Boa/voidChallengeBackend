import jwt from "jsonwebtoken";

export class TokenService {
  static createAccessToken(name: string, email: string) {
    const Secret: string = process.env.JWT_SECRET as string;

    return jwt.sign({ name, email }, Secret, {
      expiresIn: "2h",
    });
  }
}