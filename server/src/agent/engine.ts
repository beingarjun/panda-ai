import { AnalyzeInput, EngineResult, RankedCompetitor } from "../types.js";
import { Graph } from "./graph.js";

export function extractTopics(input: AnalyzeInput): string[] {
  if (input.topicsCsv?.trim()) {
    return input.topicsCsv.split(",").map(s => s.trim()).filter(Boolean);
  }
  const words = input.description.toLowerCase().replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/).filter(w => w.length > 3);
  // take top 6 unique as rough heuristic
  const seen = new Set<string>(); const out: string[] = [];
  for (const w of words) { if (!seen.has(w)) { out.push(w); seen.add(w); } if (out.length >= 6) break; }
  return out.length ? out : ["visibility","analytics","geo","content"];
}

export function buildGraph(topics: string[]): Graph<string> {
  const g = new Graph<string>();
  const comps = topics.map((t,i)=>`comp:${t}-labs-${i+1}`);
  const srcs = [
    "src:example.com/faq-schema",
    "src:contenthub.com/pillar-cluster",
    "src:docs.example.org/howto"
  ];
  for (const t of topics) g.addNode(`topic:${t}`);
  for (const c of comps) g.addNode(c);
  for (const s of srcs) g.addNode(s);
  for (const t of topics) {
    for (const c of comps) if (Math.random() > 0.35) g.addUndirected(`topic:${t}`, c);
    for (const s of srcs) if (Math.random() > 0.25) g.addUndirected(`topic:${t}`, s);
  }
  return g;
}

export function rankCompetitors(g: Graph<string>): RankedCompetitor[] {
  const comps = g.nodes().filter(n => n.startsWith("comp:"));
  const out: RankedCompetitor[] = [];
  for (const c of comps) {
    const deg = g.degree(c);
    const topical = 50 + Math.min(45, deg * 5);
    const schema = 40 + Math.floor(Math.random() * 50);
    const freshness = 45 + Math.floor(Math.random() * 50);
    const score = Math.round(topical * 0.45 + schema * 0.30 + freshness * 0.25);
    out.push({ name: c.replace(/^comp:/,""), score, topical, schema, freshness });
  }
  return out.sort((a,b)=>b.score-a.score);
}

export function simulateEngines(topics: string[], input: AnalyzeInput): EngineResult[] {
  const engines = ["ChatGPT","Perplexity","Google AI Overviews"] as const;
  const topicLength = topics.join(" ").length;
  return engines.map(engine => {
    const bias = engine === "Perplexity" ? 5 : engine === "Google AI Overviews" ? -2 : 0;
    const score = Math.min(96, 55 + (topicLength % 33) + bias);
    const sources = [
      { title: "Ultimate FAQ Schema Guide", url: "https://example.com/faq-schema" },
      { title: "Pillar-Cluster Content Strategy", url: "https://contenthub.com/pillar-cluster" },
      { title: "HowTo Markup Best Practices", url: "https://docs.example.org/howto" }
    ];
    return {
      engine, score, sources,
      issues: ["Missing FAQ schema","Thin topic clusters"],
      suggestions: ["Add JSON-LD FAQ/HowTo","Publish pillars + cluster pages","Add TL;DR abstracts"]
    };
  });
}
