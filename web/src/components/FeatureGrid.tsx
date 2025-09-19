import React from "react";

export function FeatureGrid() {
  const features = [
    { title: "AI Visibility", description: "Track your mentions across ChatGPT, Perplexity, and Google AI" },
    { title: "Competitor Analysis", description: "See how competitors rank and what makes them visible" },
    { title: "Action Plans", description: "Get specific, actionable recommendations to improve ranking" },
    { title: "Real-time Monitoring", description: "Monitor changes in AI search engine visibility" }
  ];

  return (
    <div style={{ padding: "48px 24px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "48px", fontSize: "2rem" }}>
        Features
      </h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "24px" 
      }}>
        {features.map((feature, i) => (
          <div key={i} style={{ 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "24px" 
          }}>
            <h3 style={{ marginBottom: "12px" }}>{feature.title}</h3>
            <p style={{ color: "#6b7280" }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
