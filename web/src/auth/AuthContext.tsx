import React, { createContext, useContext, useEffect, useState } from "react";
import { postJSON, getJSON } from "../api";

type User = { uid: number; email: string } | null;
type Ctx = {
  user: User;
  signin(email: string, password: string): Promise<void>;
  signup(email: string, password: string): Promise<void>;
  signout(): Promise<void>;
};

const AuthCtx = createContext<Ctx>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    getJSON<User>("/api/auth/me").then(setUser).catch(()=>{});
  }, []);

  async function signin(email: string, password: string) {
    await postJSON("/api/auth/signin", { email, password });
    const me = await getJSON<User>("/api/auth/me");
    setUser(me);
  }

  async function signup(email: string, password: string) {
    await postJSON("/api/auth/signup", { email, password });
    const me = await getJSON<User>("/api/auth/me");
    setUser(me);
  }

  async function signout() {
    await postJSON("/api/auth/logout", {});
    setUser(null);
  }

  return <AuthCtx.Provider value={{ user, signin, signup, signout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
