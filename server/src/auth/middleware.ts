import { Request, Response, NextFunction } from "express";
import { verify } from "./jwt.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send("Unauthorized");
  try {
    (req as any).claims = verify(token);
    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
}
