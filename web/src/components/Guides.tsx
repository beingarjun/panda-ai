import React from "react";

export function Guides() {
  const guides = [
    { title: "Getting Started", description: "Learn the basics of AI search optimization" },
    { title: "Schema Markup", description: "Implement FAQ and HowTo structured data" },
    { title: "Content Strategy", description: "Build pillar and cluster content architecture" }
  ];

  return (
    <div style={{ padding: "48px 24px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "48px", fontSize: "2rem" }}>
        Guides & Resources
      </h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "24px",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        {guides.map((guide, i) => (
          <div key={i} style={{ 
            border: "1px solid #e5e7eb", 
            borderRadius: "8px", 
            padding: "24px",
            cursor: "pointer"
          }}>
            <h3 style={{ marginBottom: "12px" }}>{guide.title}</h3>
            <p style={{ color: "#6b7280" }}>{guide.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
