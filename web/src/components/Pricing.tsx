import React from "react";

export function Pricing() {
  return (
    <div style={{ padding: "48px 24px", backgroundColor: "#f9fafb" }}>
      <h2 style={{ textAlign: "center", marginBottom: "48px", fontSize: "2rem" }}>
        Simple Pricing
      </h2>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ 
          border: "1px solid #e5e7eb", 
          borderRadius: "8px", 
          padding: "48px", 
          backgroundColor: "white",
          textAlign: "center"
        }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Free Trial</h3>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Try Panda AI with no commitments
          </p>
          <ul style={{ textAlign: "left", marginBottom: "24px" }}>
            <li>1 free analysis</li>
            <li>Competitor insights</li>
            <li>Action plan</li>
            <li>AI visibility dashboard</li>
          </ul>
          <button style={{ 
            backgroundColor: "#111827", 
            color: "white", 
            padding: "12px 24px", 
            borderRadius: "8px", 
            border: "none", 
            width: "100%",
            cursor: "pointer"
          }}>
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}
