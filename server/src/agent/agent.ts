import { AnalyzeInput } from "../types.js";
import { extractTopics, buildGraph, rankCompetitors, simulateEngines } from "./engine.js";

export type AgentLog = { step: string; detail: string };

export async function runAgent(input: AnalyzeInput) {
  const logs: AgentLog[] = [];

  const topics = extractTopics(input);
  logs.push({ step: "extract_topics", detail: `topics=${topics.join(", ")}` });

  const graph = buildGraph(topics);
  logs.push({ step: "build_graph", detail: `nodes=${(graph as any).edges?.size ?? "n/a"}` });

  const competitors = rankCompetitors(graph);
  logs.push({ step: "rank_competitors", detail: `top=${competitors[0]?.name ?? "n/a"}` });

  const engineResults = simulateEngines(topics, input);
  const avg = Math.round(engineResults.reduce((s, r) => s + r.score, 0) / engineResults.length);
  logs.push({ step: "simulate_engines", detail: `avg_score=${avg}` });

  const analysis = {
    summary: `Average visibility score is ${avg}. Strongest on ${[...engineResults].sort((a,b)=>b.score-a.score)[0].engine}.`,
    reasons: [
      "Competitors publish LLM-ready summaries and FAQs more consistently",
      "They use structured data (FAQ, HowTo, Product) to seed AI overviews",
      "Higher topical authority via pillar + cluster architecture"
    ],
    actions: [
      "Ship FAQ schema and 3 pillar pages with 4 cluster posts each",
      "Add TL;DR abstracts and comparison tables to top 10 pages",
      "Create brand knowledge card (About, pricing, integrations)"
    ]
  };

  return { topics, competitors, engineResults, analysis, logs };
}
