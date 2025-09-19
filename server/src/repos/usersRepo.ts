import db from "../db.js";

export function createUser(email: string, passwordHash?: string, profile?: {
  name?: string;
  avatar_url?: string;
  provider?: string;
  provider_id?: string;
}): number {
  return db.createUser(email, passwordHash, profile);
}

export function findUserByEmail(email: string) {
  return db.findUserByEmail(email);
}

export function findUserById(id: number) {
  return db.findUserById(id);
}

export function findUserByProvider(provider: string, providerId: string) {
  return db.findUserByProvider(provider, providerId);
}
