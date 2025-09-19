import React from "react";

function TestApp() {
  return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center", 
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐼 Panda AI</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        AI-powered web application built with React & TypeScript
      </p>
      <div style={{ 
        background: "rgba(255,255,255,0.1)", 
        padding: "1rem", 
        borderRadius: "10px",
        marginBottom: "2rem"
      }}>
        <h3>✅ Deployment Successful!</h3>
        <p>React app is running correctly</p>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <p><strong>Repository:</strong> github.com/beingarjun/panda-ai</p>
        <p><strong>Built with:</strong> React + TypeScript + Vite</p>
        <p><strong>Hosted on:</strong> Surge.sh</p>
      </div>
    </div>
  );
}

export default TestApp;