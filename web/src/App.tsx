import React, { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function Shell() {
  const { user, signin, signup, signout, signinWithGoogle, signinWithMicrosoft, signinWithApple } = useAuth();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [showTraditionalAuth, setShowTraditionalAuth] = useState(false);

  async function handleSignup() {
    try {
      await signup(email, password);
    } catch (error) {
      alert("Signup failed: " + error);
    }
  }

  async function handleSignin() {
    try {
      await signin(email, password);
    } catch (error) {
      alert("Signin failed: " + error);
    }
  }

  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><strong>Panda AI</strong> <span style={{ border: "1px solid #e5e7eb", padding: "2px 6px", borderRadius: 999 }}>GEO</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {user ? (
            <>
              {user.avatar_url && (
                <img 
                  src={user.avatar_url} 
                  alt="Profile" 
                  style={{ width: 24, height: 24, borderRadius: "50%" }}
                />
              )}
              <span style={{ color: "#6b7280" }}>
                {user.name || user.email}
                {user.provider && user.provider !== 'local' && (
                  <span style={{ fontSize: "0.75rem", marginLeft: 4, color: "#9ca3af" }}>
                    via {user.provider}
                  </span>
                )}
              </span>
              <button onClick={signout} style={{ padding: "4px 8px", border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              {!showTraditionalAuth ? (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {/* OAuth Buttons */}
                  <button 
                    onClick={signinWithGoogle}
                    style={{ 
                      padding: "6px 12px", 
                      backgroundColor: "#4285f4", 
                      color: "white", 
                      border: "none", 
                      borderRadius: 4, 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.875rem"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  
                  <button 
                    onClick={signinWithMicrosoft}
                    style={{ 
                      padding: "6px 12px", 
                      backgroundColor: "#0078d4", 
                      color: "white", 
                      border: "none", 
                      borderRadius: 4, 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.875rem"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                    </svg>
                    Microsoft
                  </button>
                  
                  <button 
                    onClick={signinWithApple}
                    style={{ 
                      padding: "6px 12px", 
                      backgroundColor: "#000", 
                      color: "white", 
                      border: "none", 
                      borderRadius: 4, 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.875rem"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Apple
                  </button>

                  <span style={{ color: "#6b7280", margin: "0 8px" }}>or</span>
                  
                  <button 
                    onClick={() => setShowTraditionalAuth(true)}
                    style={{ padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer" }}
                  >
                    Email/Password
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input 
                    placeholder="email" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)}
                    style={{ padding: 4, border: "1px solid #e5e7eb", borderRadius: 4 }}
                  />
                  <input 
                    placeholder="password" 
                    type="password" 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)}
                    style={{ padding: 4, border: "1px solid #e5e7eb", borderRadius: 4 }}
                  />
                  <button 
                    onClick={handleSignup}
                    style={{ padding: "4px 8px", backgroundColor: "#111827", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
                  >
                    Sign Up
                  </button>
                  <button 
                    onClick={handleSignin}
                    style={{ padding: "4px 8px", border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer" }}
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setShowTraditionalAuth(false)}
                    style={{ padding: "4px 8px", border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer", color: "#6b7280" }}
                  >
                    Back
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {user ? <Dashboard /> : <Landing />}
    </div>
  );
}

export default function App() {
  return <AuthProvider><Shell /></AuthProvider>;
}
