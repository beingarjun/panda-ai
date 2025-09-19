import React, { useState, useEffect } from "react";
import { postJSON } from "../api";
import { BarChart } from "../components/Chart";
import { SimpleTable } from "../components/Table";
import { useSubscription } from "../contexts/SubscriptionContextDemo";
import { PricingModal } from "../components/PricingModal";
import { UsageProgress } from "../components/UsageProgress";

type EngineResult = { engine: string; score: number; sources: {title: string; url: string}[]; issues: string[]; suggestions: string[]; };
type RankedCompetitor = { name: string; score: number; topical: number; schema: number; freshness: number };
type PredictiveData = {
  futureScore: number;
  trend: "up" | "down" | "stable";
  confidence: number;
  factors: string[];
  recommendations: string[];
};

export default function Dashboard() {
  const { refreshSubscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<"basic" | "predictive">("basic");
  const [website, setWebsite] = useState("example.com");
  const [description, setDescription] = useState("AI-powered analytics platform");
  const [topics, setTopics] = useState("AI, analytics, business intelligence");
  const [prompts, setPrompts] = useState("What are the best AI analytics tools?");
  const [competitors, setCompetitors] = useState<RankedCompetitor[]>([
    { name: "Bear AI", score: 65, topical: 70, schema: 60, freshness: 65 },
    { name: "Competitor B", score: 58, topical: 55, schema: 62, freshness: 57 },
    { name: "Competitor C", score: 45, topical: 48, schema: 42, freshness: 45 }
  ]);
  const [engines, setEngines] = useState<EngineResult[]>([
    { 
      engine: "ChatGPT", 
      score: 78, 
      sources: [
        { title: "AI Analytics Guide", url: "https://example.com/guide" },
        { title: "Best Practices", url: "https://example.com/practices" }
      ], 
      issues: ["Limited brand mentions", "Competitor dominance"], 
      suggestions: ["Optimize content for AI queries", "Improve topical authority"] 
    },
    { 
      engine: "Claude", 
      score: 72, 
      sources: [{ title: "Industry Report", url: "https://example.com/report" }], 
      issues: ["Outdated information"], 
      suggestions: ["Update content regularly"] 
    },
    { 
      engine: "Perplexity", 
      score: 69, 
      sources: [{ title: "Tech Review", url: "https://example.com/review" }], 
      issues: ["Low ranking"], 
      suggestions: ["Enhance source authority"] 
    }
  ]);
  const [analysis, setAnalysis] = useState<{ summary: string; reasons: string[]; actions: string[] }>({
    summary: "Your brand has moderate visibility across AI platforms with opportunities for improvement.",
    reasons: ["Limited content optimization", "Strong competitor presence", "Outdated information architecture"],
    actions: ["Optimize for semantic search", "Create AI-focused content", "Improve technical SEO"]
  });
  const [predictiveData, setPredictiveData] = useState<PredictiveData>({
    futureScore: 89,
    trend: "up",
    confidence: 98,
    factors: ["Improved content strategy", "AI algorithm preferences", "Competitor analysis insights"],
    recommendations: ["Deploy autonomous agents", "Implement real-time optimization", "Focus on multi-modal content"]
  });
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [pricingReason, setPricingReason] = useState("");

  // Demo data for autonomous agents
  const [agentStatus] = useState([
    { name: "Content Optimizer", status: "Active", lastAction: "2 min ago", performance: 94 },
    { name: "Competitor Monitor", status: "Active", lastAction: "5 min ago", performance: 96 },
    { name: "Trend Predictor", status: "Active", lastAction: "1 min ago", performance: 98 },
    { name: "SEO Enhancer", status: "Active", lastAction: "3 min ago", performance: 92 }
  ]);

  async function runTrial() {
    // Demo function - in real app would call API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update with new demo data
      setCompetitors([
        { name: "Bear AI", score: 65, topical: 70, schema: 60, freshness: 65 },
        { name: "Competitor B", score: 58, topical: 55, schema: 62, freshness: 57 },
        { name: "Competitor C", score: 45, topical: 48, schema: 42, freshness: 45 }
      ]);
      
      await refreshSubscription();
    } catch (err: any) {
      alert("Error running analysis: " + err.message);
    }
  }

  return (
    <div style={{ padding: "24px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px"
          }}>
            🐼 Panda AI Dashboard
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Compare basic reports vs advanced predictive analytics
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: "flex", 
          gap: "4px", 
          marginBottom: "32px",
          background: "white",
          padding: "4px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb"
        }}>
          <button
            onClick={() => setActiveTab("basic")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "basic" ? "linear-gradient(45deg, #ef4444, #dc2626)" : "transparent",
              color: activeTab === "basic" ? "white" : "#6b7280",
              fontWeight: "600",
              cursor: "pointer",
              flex: 1
            }}
          >
            🐻 Basic Reports (Bear AI Style)
          </button>
          <button
            onClick={() => setActiveTab("predictive")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "predictive" ? "linear-gradient(45deg, #667eea, #764ba2)" : "transparent",
              color: activeTab === "predictive" ? "white" : "#6b7280",
              fontWeight: "600",
              cursor: "pointer",
              flex: 1
            }}
          >
            🐼 Predictive Analytics (Panda AI)
          </button>
        </div>

        {/* Input Section */}
        <div style={{ 
          background: "white", 
          padding: "24px", 
          borderRadius: "16px", 
          marginBottom: "32px",
          border: "1px solid #e5e7eb"
        }}>
          <h3 style={{ marginBottom: "16px", fontSize: "1.2rem" }}>Analysis Settings</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <input 
              placeholder="Website URL (e.g., example.com)" 
              value={website} 
              onChange={e=>setWebsite(e.target.value)}
              style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
            <input 
              placeholder="Topics (e.g., AI, analytics, SaaS)" 
              value={topics} 
              onChange={e=>setTopics(e.target.value)}
              style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            />
          </div>
          <textarea 
            placeholder="Describe your website and business" 
            value={description} 
            onChange={e=>setDescription(e.target.value)}
            style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", minHeight: "80px", width: "100%", marginBottom: "16px" }}
          />
          <button 
            onClick={runTrial}
            style={{ 
              padding: "12px 32px", 
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white", 
              border: "none", 
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            🚀 Run Analysis
          </button>
        </div>

        {/* Basic Reports Tab */}
        {activeTab === "basic" && (
          <div>
            <div style={{ 
              background: "#fef2f2", 
              border: "1px solid #fecaca", 
              padding: "16px", 
              borderRadius: "12px", 
              marginBottom: "24px" 
            }}>
              <h4 style={{ color: "#dc2626", marginBottom: "8px" }}>🐻 Bear AI Style - Basic Tracking</h4>
              <p style={{ color: "#7f1d1d", fontSize: "0.9rem" }}>
                Simple visibility tracking with manual optimization recommendations (similar to what Bear AI offers)
              </p>
            </div>

            {/* Basic Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>73</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Visibility Score</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>12</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Mentions/Month</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>3</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>AI Platforms</div>
              </div>
            </div>

            {/* Basic Competitor Analysis */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ marginBottom: "16px" }}>Competitor Rankings</h3>
              <SimpleTable
                rows={competitors}
                columns={[
                  { key: "name", label: "Competitor" },
                  { key: "score", label: "Score" },
                  { key: "topical", label: "Topical" },
                  { key: "schema", label: "Schema" },
                  { key: "freshness", label: "Freshness" }
                ]}
              />
            </div>

            {/* Basic AI Platform Results */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ marginBottom: "16px" }}>AI Platform Visibility</h3>
              <BarChart data={engines.map(e => ({ label: e.engine, value: e.score }))} />
            </div>

            {/* Basic Recommendations */}
            {analysis && (
              <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
                <h3 style={{ marginBottom: "16px" }}>Manual Recommendations</h3>
                <p style={{ marginBottom: "16px", color: "#6b7280" }}>{analysis.summary}</p>
                <div style={{ marginBottom: "16px" }}>
                  <h4 style={{ marginBottom: "8px", color: "#dc2626" }}>Issues Found:</h4>
                  <ul style={{ color: "#6b7280" }}>
                    {analysis.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: "8px", color: "#dc2626" }}>Suggested Actions:</h4>
                  <ul style={{ color: "#6b7280" }}>
                    {analysis.actions.map((action, i) => <li key={i}>{action}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Predictive Analytics Tab */}
        {activeTab === "predictive" && (
          <div>
            <div style={{ 
              background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", 
              border: "1px solid #7dd3fc", 
              padding: "16px", 
              borderRadius: "12px", 
              marginBottom: "24px" 
            }}>
              <h4 style={{ color: "#0369a1", marginBottom: "8px" }}>🐼 Panda AI - Autonomous Predictive Analytics</h4>
              <p style={{ color: "#0c4a6e", fontSize: "0.9rem" }}>
                AI agents working 24/7 with predictive scoring, real-time optimization, and autonomous improvements
              </p>
            </div>

            {/* Autonomous Agents Status */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                🤖 Autonomous AI Agents
                <span style={{ 
                  background: "linear-gradient(45deg, #10b981, #059669)", 
                  color: "white", 
                  padding: "4px 8px", 
                  borderRadius: "12px", 
                  fontSize: "0.7rem" 
                }}>
                  ACTIVE
                </span>
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                {agentStatus.map((agent, i) => (
                  <div key={i} style={{ 
                    background: "#f8fafc", 
                    padding: "16px", 
                    borderRadius: "12px", 
                    border: "1px solid #e2e8f0" 
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontWeight: "600" }}>{agent.name}</span>
                      <span style={{ 
                        background: "#10b981", 
                        color: "white", 
                        padding: "2px 8px", 
                        borderRadius: "8px", 
                        fontSize: "0.7rem" 
                      }}>
                        {agent.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "4px" }}>
                      Last action: {agent.lastAction}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, background: "#e2e8f0", borderRadius: "4px", height: "6px" }}>
                        <div style={{ 
                          background: "linear-gradient(45deg, #667eea, #764ba2)", 
                          height: "100%", 
                          borderRadius: "4px",
                          width: `${agent.performance}%`
                        }} />
                      </div>
                      <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>{agent.performance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictive Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>89</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Predicted Score (30d)</div>
                <div style={{ color: "#10b981", fontSize: "0.8rem", marginTop: "4px" }}>↗ +16 improvement</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>98%</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>AI Confidence</div>
                <div style={{ color: "#10b981", fontSize: "0.8rem", marginTop: "4px" }}>High accuracy</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>50+</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>AI Platforms</div>
                <div style={{ color: "#10b981", fontSize: "0.8rem", marginTop: "4px" }}>Real-time monitoring</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>24/7</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Auto-Optimization</div>
                <div style={{ color: "#10b981", fontSize: "0.8rem", marginTop: "4px" }}>Autonomous agents</div>
              </div>
            </div>

            {/* Predictive Trends */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ marginBottom: "16px" }}>🔮 30-Day Predictive Forecast</h3>
              <div style={{ 
                background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", 
                padding: "20px", 
                borderRadius: "12px", 
                marginBottom: "16px" 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "3rem" }}>📈</div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0369a1" }}>
                      Visibility Score: {predictiveData.futureScore}
                    </div>
                    <div style={{ color: "#0c4a6e" }}>
                      Trend: {predictiveData.trend === "up" ? "↗ Improving" : predictiveData.trend === "down" ? "↘ Declining" : "→ Stable"} 
                      ({predictiveData.confidence}% confidence)
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                  <h4 style={{ color: "#0369a1", marginBottom: "8px" }}>Key Prediction Factors:</h4>
                  <ul style={{ color: "#0c4a6e" }}>
                    {predictiveData.factors.map((factor, i) => <li key={i}>{factor}</li>)}
                  </ul>
                </div>
                
                <div>
                  <h4 style={{ color: "#0369a1", marginBottom: "8px" }}>AI Agent Recommendations:</h4>
                  <ul style={{ color: "#0c4a6e" }}>
                    {predictiveData.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Advanced Competitor Intelligence */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ marginBottom: "16px" }}>⚡ Real-time Competitor Intelligence</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                {competitors.map((comp, i) => (
                  <div key={i} style={{ 
                    background: "#f8fafc", 
                    padding: "16px", 
                    borderRadius: "12px", 
                    border: "1px solid #e2e8f0" 
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontWeight: "600" }}>{comp.name}</span>
                      <span style={{ 
                        background: comp.score > 60 ? "#ef4444" : "#f59e0b", 
                        color: "white", 
                        padding: "2px 8px", 
                        borderRadius: "8px", 
                        fontSize: "0.8rem" 
                      }}>
                        {comp.score}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "8px" }}>
                      Strategy: Content-heavy approach
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "8px" }}>
                      Weakness: Limited AI optimization
                    </div>
                    <div style={{ 
                      background: "linear-gradient(45deg, #10b981, #059669)", 
                      color: "white", 
                      padding: "6px 12px", 
                      borderRadius: "6px", 
                      fontSize: "0.7rem", 
                      textAlign: "center" 
                    }}>
                      🎯 OPPORTUNITY DETECTED
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Modal Analysis */}
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ marginBottom: "16px" }}>🧠 Multi-Modal AI Analysis</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div style={{ textAlign: "center", padding: "16px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📝</div>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>Text Analysis</div>
                  <div style={{ color: "#10b981", fontSize: "0.9rem" }}>Optimized</div>
                </div>
                <div style={{ textAlign: "center", padding: "16px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🖼️</div>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>Image Analysis</div>
                  <div style={{ color: "#f59e0b", fontSize: "0.9rem" }}>Improving</div>
                </div>
                <div style={{ textAlign: "center", padding: "16px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎙️</div>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>Voice Analysis</div>
                  <div style={{ color: "#10b981", fontSize: "0.9rem" }}>Excellent</div>
                </div>
                <div style={{ textAlign: "center", padding: "16px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎬</div>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>Video Analysis</div>
                  <div style={{ color: "#10b981", fontSize: "0.9rem" }}>Optimized</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Modal */}
        {showPricingModal && (
          <PricingModal 
            isOpen={showPricingModal}
            onClose={() => setShowPricingModal(false)}
            reason={pricingReason}
          />
        )}
      </div>
    </div>
  );
}
