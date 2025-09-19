import React from "react";

export function FeatureGrid() {
  const features = [
    { 
      icon: "🤖", 
      title: "Autonomous AI Agents", 
      description: "Deploy self-learning agents that continuously optimize your AI presence without human intervention",
      badge: "AUTO-PILOT"
    },
    { 
      icon: "🎯", 
      title: "Predictive Visibility Scoring", 
      description: "AI-powered forecasting predicts your visibility 30 days ahead with 98% accuracy",
      badge: "PREDICTIVE"
    },
    { 
      icon: "⚡", 
      title: "Real-time Competitor Intel", 
      description: "Live tracking of competitor strategies with instant alerts on ranking changes",
      badge: "REAL-TIME"
    },
    { 
      icon: "🔮", 
      title: "Multi-Modal AI Analysis", 
      description: "Analyze text, images, and voice across ChatGPT, Claude, Gemini, and 50+ AI platforms",
      badge: "MULTI-MODAL"
    },
    { 
      icon: "🧠", 
      title: "Context-Aware Optimization", 
      description: "AI understands intent behind queries and optimizes content for semantic relevance",
      badge: "SEMANTIC"
    },
    { 
      icon: "🚀", 
      title: "Automated Content Optimization", 
      description: "Optimize content that AI models prefer, with A/B testing and performance analytics built-in",
      badge: "OPTIMIZED"
    },
    { 
      icon: "📊", 
      title: "Advanced Analytics Dashboard", 
      description: "Deep insights with custom metrics, ROI tracking, and executive reporting",
      badge: "ANALYTICS"
    },
    { 
      icon: "🔒", 
      title: "Enterprise Security", 
      description: "SOC2 compliant with advanced encryption and enterprise-grade access controls",
      badge: "SECURE"
    }
  ];

  return (
    <div style={{ padding: "80px 24px", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Next-Generation AI Agent Platform
          </h2>
          <p style={{ 
            fontSize: "1.2rem", 
            color: "#6b7280", 
            maxWidth: "600px", 
            margin: "0 auto" 
          }}>
            Go beyond basic tracking with autonomous AI agents that actively optimize your digital presence
          </p>
        </div>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "32px" 
        }}>
          {features.map((feature, i) => (
            <div key={i} style={{ 
              background: "white",
              borderRadius: "16px", 
              padding: "32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Badge */}
              <div style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "0.7rem",
                fontWeight: "600"
              }}>
                {feature.badge}
              </div>
              
              <div style={{ 
                fontSize: "3rem", 
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                {feature.icon}
              </div>
              
              <h3 style={{ 
                marginBottom: "16px", 
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#111827"
              }}>
                {feature.title}
              </h3>
              
              <p style={{ 
                color: "#6b7280", 
                lineHeight: "1.6",
                fontSize: "1rem"
              }}>
                {feature.description}
              </p>
              
              {/* Hover effect gradient */}
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                height: "4px",
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                transform: "scaleX(0)",
                transition: "transform 0.3s ease",
                transformOrigin: "left"
              }} />
            </div>
          ))}
        </div>
        
        {/* Comparison section */}
        <div style={{ 
          marginTop: "80px", 
          background: "white", 
          borderRadius: "16px", 
          padding: "48px",
          border: "1px solid #e5e7eb"
        }}>
          <h3 style={{ 
            textAlign: "center", 
            fontSize: "1.8rem", 
            marginBottom: "32px",
            color: "#111827"
          }}>
            Why Panda AI Beats the Competition
          </h3>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "24px" 
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🐻 Bear AI</div>
              <div style={{ color: "#ef4444", fontWeight: "600" }}>Basic Tracking</div>
              <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>Manual optimization</div>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🐼 Panda AI</div>
              <div style={{ color: "#10b981", fontWeight: "600" }}>Autonomous Agents</div>
              <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>Self-optimizing AI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
