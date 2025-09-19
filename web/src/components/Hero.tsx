import React from "react";

export function Hero() {
  return (
    <div style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      textAlign: "center", 
      padding: "80px 24px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "100px",
        height: "100px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute",
        top: "60%",
        right: "15%",
        width: "150px",
        height: "150px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "50%",
        animation: "float 8s ease-in-out infinite reverse"
      }} />
      
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ 
            background: "rgba(255,255,255,0.2)", 
            padding: "8px 16px", 
            borderRadius: "50px",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            🚀 Next-Gen AI Agent Platform
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: "3.5rem", 
          fontWeight: "bold", 
          marginBottom: "1.5rem",
          lineHeight: "1.2",
          background: "linear-gradient(45deg, #ffffff, #f0f9ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Dominate AI with Autonomous
          <br />
          <span style={{ color: "#fbbf24" }}>Agentic Intelligence</span>
        </h1>
        
        <p style={{ 
          fontSize: "1.3rem", 
          color: "rgba(255,255,255,0.9)", 
          marginBottom: "3rem",
          maxWidth: "800px",
          margin: "0 auto 3rem auto",
          lineHeight: "1.6"
        }}>
          Beyond simple tracking - deploy autonomous AI agents that actively optimize your brand presence across 
          ChatGPT, Claude, Perplexity, and 50+ AI platforms. Real-time competitor intel, automated content optimization, 
          and predictive visibility scoring.
        </p>
        
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ 
            background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
            color: "white", 
            padding: "16px 32px", 
            borderRadius: "12px", 
            border: "none", 
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(251, 191, 36, 0.3)",
            transition: "all 0.3s ease"
          }}>
            🤖 Deploy AI Agents Free
          </button>
          
          <button style={{ 
            background: "rgba(255,255,255,0.1)",
            color: "white", 
            padding: "16px 32px", 
            borderRadius: "12px", 
            border: "2px solid rgba(255,255,255,0.3)", 
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            backdropFilter: "blur(10px)"
          }}>
            📊 View Live Demo
          </button>
        </div>
        
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#fbbf24" }}>50+</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>AI Platforms</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#fbbf24" }}>24/7</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Auto Optimization</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#fbbf24" }}>98%</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Accuracy Rate</div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
