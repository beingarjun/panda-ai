import jwt from "jsonwebtoken";
import { ENV } from "../env.js";

export type Claims = { uid: number; email: string };

export function sign(claims: Claims): string {
  return jwt.sign(claims, ENV.JWT_SECRET, { algorithm: "HS256", expiresIn: "7d" });
}

export function verify(token: string): Claims {
  return jwt.verify(token, ENV.JWT_SECRET) as Claims;
}
