import { z } from "zod";
import { api } from "./api";
import type { TokenResponse, User } from "@/types";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export async function login(data: LoginInput): Promise<TokenResponse> {
  return api.post<TokenResponse>("/auth/login", data, false);
}

export async function register(data: Pick<RegisterInput, "email" | "password">): Promise<User> {
  return api.post<User>("/users/create-user", data, false);
}
