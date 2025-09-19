import React from "react";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for testing our AI agents",
      features: [
        "✅ 5 AI agent deployments",
        "✅ Basic visibility tracking",
        "✅ 3 competitor analysis",
        "✅ Weekly reports",
        "✅ Community support"
      ],
      cta: "Start Free",
      popular: false,
      color: "#6b7280"
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "For growing businesses that need advanced AI optimization",
      features: [
        "🚀 Unlimited AI agents",
        "🤖 Autonomous optimization",
        "📊 Real-time competitor intel",
        "🎯 Predictive analytics",
        "⚡ Multi-platform tracking (50+)",
        "🔧 Custom integrations",
        "📞 Priority support",
        "📈 Advanced reporting"
      ],
      cta: "Start Pro Trial",
      popular: true,
      color: "#667eea"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations requiring enterprise-grade AI",
      features: [
        "🏢 White-label solution",
        "🔒 Enterprise security (SOC2)",
        "👥 Dedicated AI specialist",
        "🎨 Custom AI model training",
        "📊 Executive dashboards",
        "🔗 API access & webhooks",
        "⚡ 99.9% SLA guarantee",
        "🏆 Success guarantee"
      ],
      cta: "Book Demo",
      popular: false,
      color: "#764ba2"
    }
  ];

  return (
    <div style={{ padding: "80px 24px", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}>
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
            Pricing That Beats Bear AI
          </h2>
          <p style={{ 
            fontSize: "1.2rem", 
            color: "#6b7280",
            marginBottom: "2rem"
          }}>
            Get more advanced features for less. No setup fees, cancel anytime.
          </p>
          
          {/* Comparison banner */}
          <div style={{
            background: "linear-gradient(45deg, #10b981, #059669)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "50px",
            display: "inline-block",
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "2rem"
          }}>
            💡 Save $351/month vs Bear AI • Same features + Autonomous AI Agents
          </div>
        </div>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "32px",
          alignItems: "start"
        }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ 
              background: "white",
              borderRadius: "20px", 
              padding: "40px 32px",
              boxShadow: plan.popular ? "0 20px 60px rgba(102, 126, 234, 0.15)" : "0 8px 32px rgba(0,0,0,0.08)",
              border: plan.popular ? "3px solid #667eea" : "1px solid #e5e7eb",
              position: "relative",
              transform: plan.popular ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s ease"
            }}>
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "white",
                  padding: "8px 24px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "600"
                }}>
                  🔥 MOST POPULAR
                </div>
              )}
              
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h3 style={{ 
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: plan.color
                }}>
                  {plan.name}
                </h3>
                
                <div style={{ marginBottom: "16px" }}>
                  <span style={{ 
                    fontSize: "3rem", 
                    fontWeight: "bold",
                    color: "#111827"
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ 
                    fontSize: "1rem", 
                    color: "#6b7280" 
                  }}>
                    {plan.period}
                  </span>
                </div>
                
                <p style={{ 
                  color: "#6b7280", 
                  fontSize: "0.95rem",
                  lineHeight: "1.5"
                }}>
                  {plan.description}
                </p>
              </div>
              
              <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                marginBottom: "32px" 
              }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ 
                    padding: "8px 0",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    color: "#374151"
                  }}>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button style={{ 
                background: plan.popular 
                  ? "linear-gradient(45deg, #667eea, #764ba2)"
                  : plan.color,
                color: "white", 
                padding: "16px 24px", 
                borderRadius: "12px", 
                border: "none", 
                width: "100%",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}>
                {plan.cta}
              </button>
              
              {plan.name === "Professional" && (
                <div style={{
                  textAlign: "center",
                  marginTop: "16px",
                  fontSize: "0.8rem",
                  color: "#10b981",
                  fontWeight: "600"
                }}>
                  💳 No credit card required • 14-day free trial
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Comparison table */}
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
            Panda AI vs Bear AI Feature Comparison
          </h3>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr 1fr", 
            gap: "16px",
            fontSize: "0.9rem"
          }}>
            <div style={{ fontWeight: "600", padding: "12px", borderBottom: "2px solid #e5e7eb" }}>Feature</div>
            <div style={{ fontWeight: "600", padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "center" }}>Bear AI</div>
            <div style={{ fontWeight: "600", padding: "12px", borderBottom: "2px solid #e5e7eb", textAlign: "center" }}>Panda AI</div>
            
            <div style={{ padding: "12px" }}>Autonomous AI Agents</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#ef4444" }}>❌</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#10b981" }}>✅</div>
            
            <div style={{ padding: "12px" }}>Predictive Analytics</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#ef4444" }}>❌</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#10b981" }}>✅</div>
            
            <div style={{ padding: "12px" }}>Multi-Modal AI Analysis</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#ef4444" }}>❌</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#10b981" }}>✅</div>
            
            <div style={{ padding: "12px" }}>Enterprise Security (SOC2)</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#ef4444" }}>❌</div>
            <div style={{ padding: "12px", textAlign: "center", color: "#10b981" }}>✅</div>
            
            <div style={{ padding: "12px" }}>Starting Price</div>
            <div style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>$200/mo</div>
            <div style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#10b981" }}>Free</div>
          </div>
        </div>
      </div>
    </div>
  );
}
