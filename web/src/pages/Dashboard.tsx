import React, { useState } from "react";
import { postJSON } from "../api";
import { BarChart } from "../components/Chart";
import { SimpleTable } from "../components/Table";

type EngineResult = { engine: string; score: number; sources: {title: string; url: string}[]; issues: string[]; suggestions: string[]; };
type RankedCompetitor = { name: string; score: number; topical: number; schema: number; freshness: number };

export default function Dashboard() {
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [prompts, setPrompts] = useState("");
  const [competitors, setCompetitors] = useState<RankedCompetitor[]>([]);
  const [engines, setEngines] = useState<EngineResult[]>([]);
  const [analysis, setAnalysis] = useState<{ summary: string; reasons: string[]; actions: string[] }|null>(null);

  async function runTrial() {
    try {
      const res = await postJSON<{
        runId: string;
        competitors: RankedCompetitor[];
        engineResults: EngineResult[];
        analysis: { summary: string; reasons: string[]; actions: string[] };
      }>("/api/analyze", {
        website, description, topicsCsv: topics, promptsText: prompts
      });
      setCompetitors(res.competitors);
      setEngines(res.engineResults);
      setAnalysis(res.analysis);
    } catch (error) {
      alert("Error running analysis: " + error);
    }
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <h2>Panda AI — Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input 
          placeholder="Website URL" 
          value={website} 
          onChange={e=>setWebsite(e.target.value)}
          style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 4 }}
        />
        <input 
          placeholder="Topics (comma separated)" 
          value={topics} 
          onChange={e=>setTopics(e.target.value)}
          style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 4 }}
        />
      </div>
      <textarea 
        placeholder="Describe your website" 
        value={description} 
        onChange={e=>setDescription(e.target.value)}
        style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 4, minHeight: 60 }}
      />
      <textarea 
        placeholder="Prompts (one per line)" 
        value={prompts} 
        onChange={e=>setPrompts(e.target.value)}
        style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 4, minHeight: 60 }}
      />
      <button 
        onClick={runTrial}
        style={{ 
          padding: "12px 24px", 
          backgroundColor: "#111827", 
          color: "white", 
          border: "none", 
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Run Trial
      </button>

      {competitors.length > 0 && (
        <div>
          <h3>Competitor Ranking</h3>
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
      )}

      {engines.length > 0 && (
        <div>
          <h3>AI Visibility Dashboard</h3>
          <BarChart data={engines.map(e => ({ label: e.engine, value: e.score }))} />
          {engines.map((e, i) => (
            <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.engine}</strong><span>Score: {e.score}</span>
              </div>
              <div><em>Sources</em></div>
              <ul>{e.sources.map((s, j)=>(<li key={j}><a href={s.url} target="_blank">{s.title}</a></li>))}</ul>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <div><strong>Issues</strong></div>
                  <ul>{e.issues.map((x,j)=>(<li key={j}>{x}</li>))}</ul>
                </div>
                <div>
                  <div><strong>Suggestions</strong></div>
                  <ul>{e.suggestions.map((x,j)=>(<li key={j}>{x}</li>))}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {analysis && (
        <div>
          <h3>Analysis</h3>
          <p>{analysis.summary}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div><strong>Why competitors rank higher</strong></div>
              <ul>{analysis.reasons.map((r,i)=>(<li key={i}>{r}</li>))}</ul>
            </div>
            <div>
              <div><strong>Action plan (30 days)</strong></div>
              <ul>{analysis.actions.map((a,i)=>(<li key={i}>{a}</li>))}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
