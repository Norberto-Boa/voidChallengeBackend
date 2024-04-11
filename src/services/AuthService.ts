import { hash } from "bcrypt";
import { UserDTO } from "../@types/userDTO";
import { prismaClient } from "../prisma/prisma";
import { User } from "@prisma/client";

export class AuthService {
  static async createUser({ email, name, password }: UserDTO): Promise<User> {
    const hashedPassword = await hash(password, 10);
    return await prismaClient.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });
  }

  static async existsByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }
}
