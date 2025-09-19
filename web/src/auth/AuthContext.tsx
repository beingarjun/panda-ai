import React, { createContext, useContext, useEffect, useState } from "react";
import { postJSON, getJSON } from "../api";

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
  // signinWithApple(): void; // Disabled - requires additional configuration
};

const AuthCtx = createContext<Ctx>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Check for auth errors in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'auth_failed') {
      alert('Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

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

  function signinWithGoogle() {
    window.location.href = "/api/auth/google";
  }

  function signinWithMicrosoft() {
    window.location.href = "/api/auth/microsoft";
  }

  // Apple OAuth disabled - requires additional configuration
  // function signinWithApple() {
  //   window.location.href = "/api/auth/apple";
  // }

  return (
    <AuthCtx.Provider value={{ 
      user, 
      signin, 
      signup, 
      signout, 
      signinWithGoogle, 
      signinWithMicrosoft
      // signinWithApple // Disabled
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() { return useContext(AuthCtx); }
