import { Request, Response } from "express";
import { createUserValidator } from '../validator/User/createUserValidator';
import { AuthService } from "../services/AuthService";
import { compare } from "bcrypt";
import { TokenService } from "../services/TokenService";

export async function register(req: Request, res: Response) {
  const { name, email, password } = createUserValidator.parse(req.body);

  const userExistsByEmail = await AuthService.existsByEmail(email);

  if (userExistsByEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  await AuthService.createUser({
    name,
    email,
    password
  });

  return res.status(201).json({ message: "User created successfully!" })
}

export async function login(req: Request, res: Response) {
  const { email, password } = createUserValidator.pick({ email: true, password: true }).parse(req.body);

  const userExistsByEmail = await AuthService.existsByEmail(email);

  if (!userExistsByEmail) {
    return res.status(400).json({ message: 'Credentials are Wrong' });
  }

  const checkPassword = await compare(password, userExistsByEmail.password);

  if (!checkPassword) {
    return res.status(400).json({ message: 'Credentials are Wrong' });
  }

  const token = TokenService.createAccessToken(userExistsByEmail.name, userExistsByEmail.email);

  return res.status(200).json({ message: 'Sucessfully logged in!', token });
}