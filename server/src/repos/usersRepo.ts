import db from "../db.js";

export function createUser(email: string, passwordHash: string): number {
  const st = db.prepare(
    "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)"
  );
  const info = st.run(email, passwordHash, Date.now());
  return Number(info.lastInsertRowid);
}

export function findUserByEmail(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | { id: number; email: string; password_hash: string; created_at: number }
    | undefined;
}

export function findUserById(id: number) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | { id: number; email: string; password_hash: string; created_at: number }
    | undefined;
}
