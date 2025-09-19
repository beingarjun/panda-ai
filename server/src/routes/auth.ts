import { Router } from "express";
import { z } from "zod";
import { createUser, findUserByEmail, findUserById } from "../repos/usersRepo.js";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { sign } from "../auth/jwt.js";
import { requireAuth } from "../auth/middleware.js";

const r = Router();

const AuthDTO = z.object({ email: z.string().email(), password: z.string().min(8) });

r.post("/signup", async (req, res) => {
  const parse = AuthDTO.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error.flatten());
  const { email, password } = parse.data;

  const existing = findUserByEmail(email);
  if (existing) return res.status(409).send("Email already registered");

  const pwHash = await hashPassword(password);
  const uid = createUser(email, pwHash);
  const token = sign({ uid, email });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 7 * 864e5 });
  res.json({ ok: true, uid });
});

r.post("/signin", async (req, res) => {
  const parse = AuthDTO.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error.flatten());
  const { email, password } = parse.data;

  const found = findUserByEmail(email);
  if (!found) return res.status(401).send("Invalid credentials");
  const ok = await verifyPassword(password, found.password_hash);
  if (!ok) return res.status(401).send("Invalid credentials");

  const token = sign({ uid: found.id, email: found.email });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 7 * 864e5 });
  res.json({ ok: true, uid: found.id });
});

r.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

r.get("/me", requireAuth, (req, res) => {
  const { uid, email } = (req as any).claims;
  const u = findUserById(uid);
  if (!u) return res.status(404).send("Not found");
  res.json({ uid, email });
});

export default r;
