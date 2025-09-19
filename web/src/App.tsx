import React, { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function Shell() {
  const { user, signin, signup, signout } = useAuth();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

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
      <nav style={{ padding: 12, borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between" }}>
        <div><strong>Panda AI</strong> <span style={{ border: "1px solid #e5e7eb", padding: "2px 6px", borderRadius: 999 }}>GEO</span></div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 8, color: "#6b7280" }}>{user.email}</span>
              <button onClick={signout} style={{ marginLeft: 8, padding: "4px 8px", border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <input 
                placeholder="email" 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                style={{ padding: 4, marginRight: 8, border: "1px solid #e5e7eb", borderRadius: 4 }}
              />
              <input 
                placeholder="password" 
                type="password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)}
                style={{ padding: 4, marginRight: 8, border: "1px solid #e5e7eb", borderRadius: 4 }}
              />
              <button 
                onClick={handleSignup}
                style={{ marginRight: 8, padding: "4px 8px", backgroundColor: "#111827", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
              >
                Start for Free
              </button>
              <button 
                onClick={handleSignin}
                style={{ padding: "4px 8px", border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer" }}
              >
                Sign in
              </button>
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
