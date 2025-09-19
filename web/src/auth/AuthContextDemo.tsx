import React, { createContext, useContext, useState } from "react";

type User = { 
  uid: number; 
  email: string; 
  name?: string; 
  avatar_url?: string; 
  provider?: string; 
} | null;

type Ctx = {
  user: User;
  signin(email: string, password: string): Promise<void>;
  signup(email: string, password: string): Promise<void>;
  signout(): Promise<void>;
  signinWithGoogle(): void;
  signinWithMicrosoft(): void;
};

const AuthCtx = createContext<Ctx>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  async function signin(email: string, password: string) {
    // Demo signin - just set a demo user
    setUser({
      uid: 1,
      email: email,
      name: "Demo User",
      provider: "demo"
    });
  }

  async function signup(email: string, password: string) {
    // Demo signup - just set a demo user
    setUser({
      uid: 1,
      email: email,
      name: "Demo User",
      provider: "demo"
    });
  }

  async function signout() {
    setUser(null);
  }

  function signinWithGoogle() {
    // Demo Google signin
    setUser({
      uid: 1,
      email: "demo@gmail.com",
      name: "Demo User",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
      provider: "google"
    });
  }

  function signinWithMicrosoft() {
    // Demo Microsoft signin
    setUser({
      uid: 1,
      email: "demo@outlook.com",
      name: "Demo User",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=microsoft",
      provider: "microsoft"
    });
  }

  return (
    <AuthCtx.Provider value={{
      user,
      signin,
      signup,
      signout,
      signinWithGoogle,
      signinWithMicrosoft
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}