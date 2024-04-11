import { Request, Response, Router } from "express";
import { login, register } from "../controllers/AuthController";

const AuthRoutes = Router();

AuthRoutes.post("/signup", register);
AuthRoutes.post("/login", login);

export { AuthRoutes };