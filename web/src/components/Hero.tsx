import React from "react";

export function Hero() {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
        10x your traffic from AI Search Engines
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#6b7280", marginBottom: "2rem" }}>
        Turn AI mentions on ChatGPT, Perplexity, and Google AI into traffic and customers.
      </p>
      <button style={{ 
        backgroundColor: "#111827", 
        color: "white", 
        padding: "12px 24px", 
        borderRadius: "8px", 
        border: "none", 
        fontSize: "1rem",
        cursor: "pointer"
      }}>
        Start for Free
      </button>
    </div>
  );
}
