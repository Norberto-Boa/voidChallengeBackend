import { z } from "zod";

export const createUserValidator = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    })
    .regex(new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/), { message: "Name must only contain alpahabets characters" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
});
