import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { decryptedToken } from "../@types/Token";

export interface CustomRequest extends Request {
  user?: {
    email?: string;
    name?: string;
  }
}

export const checkIfUserIsAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ message: "User not authorized" });
    }

    const [, token] = authHeader.split(" ");
    const decoded = verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    (req as CustomRequest).user = decoded as decryptedToken;
    return next();
  } catch (e) {
    return res.status(401).json({
      message: "Usuário não autenticado!",
    });
  }
};